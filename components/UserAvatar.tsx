'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Avatar del usuario con menú de logout
 */
export default function UserAvatar() {
    const t = useTranslations('user');

    const [user, setUser] = useState<any>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const supabase = createClient();

    // Obtener usuario actual
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    /**
     * Obtener iniciales del usuario
     */
    const getInitials = () => {
        if (!user) return '??';

        // Intentar obtener de email
        if (user.email) {
            const name = user.email.split('@')[0];
            const parts = name.split(/[._-]/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        }

        // Intentar obtener de metadata
        if (user.user_metadata?.full_name) {
            const parts = user.user_metadata.full_name.split(' ');
            if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
            }
            return user.user_metadata.full_name.substring(0, 2).toUpperCase();
        }

        return 'U';
    };

    /**
     * Manejar logout
     */
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Llamar a API route de logout
            await fetch('/api/auth/logout', { method: 'POST' });

            // Redirigir a login
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setIsLoggingOut(false);
        }
    };

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar button */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-all"
            >
                {getInitials()}
            </button>

            {/* Dropdown menu */}
            {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {t('activeAccount')}
                        </p>
                    </div>

                    {/* Menu items */}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoggingOut ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {t('loggingOut')}
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t('logout')}
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
