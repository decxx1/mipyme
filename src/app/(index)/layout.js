import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import '../globals.css'
//icons
import '@/fonts/fontawesome.scss'
import '@/fonts/materialdesignicons.scss'
//theme
import '@/scss/core.scss'
import '@/scss/theme-default.scss'
import '@/scss/pages/page-auth.scss'

//import './libs/config.js'
//import './libs/helpers.js'
//import './libs/main.js'
//import './libs/page-auth.js'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

  return (
    <html lang="es"
      className="light-style layout-wide customizer-hide"
      dir="ltr"
      data-theme="theme-default"
      data-assets-path="/assets/"
      data-template="vertical-menu-template"
    >
      
      <body className={inter.className}>
        {children}
        <Toaster 
          richColors
          position="top-right"
          toastOptions={{
          style: {
              marginTop: '2rem',
          },
        }}/>
      </body>
      
    </html>
    
  )
}
