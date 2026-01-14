import React from 'react';

/**
 * Layout para rutas protegidas (generator, editor, preview)
 * Requiere autenticación (manejado por middleware)
 */
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
