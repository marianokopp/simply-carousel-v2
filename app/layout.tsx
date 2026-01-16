import { redirect } from 'next/navigation';

// Este layout solo existe para redirigir la raíz al locale por defecto
export default function RootLayout() {
  redirect('/es');
}
