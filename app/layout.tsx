import { ReactNode } from 'react'

export const metadata = {
  title: 'Monitor de Sistema',
  description: 'Dashboard de monitoreo del sistema en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
