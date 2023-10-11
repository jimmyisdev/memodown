import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from '@/redux/provider'
import GlobalSetting from '@/components/shared/GlobalSetting'
import { ToastContainer, toast } from 'react-toastify';

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
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </body>
    </html>
  )
}

