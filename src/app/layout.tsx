import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalSetting from '@/components/shared/GlobalSetting'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memodown',
  description: 'Best Memo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log(children)

  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/md_logo.png' />
      </head>
      <body className={inter.className}>
        <div >
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </div>
      </body>
    </html>
  )
}

