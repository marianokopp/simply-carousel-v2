import React from 'react';

/**
 * Layout para rutas públicas (landing, pricing)
 * No requiere autenticación
 */
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {children}
        </div>
    );
}
