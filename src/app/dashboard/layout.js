export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'edge'
export const preferredRegion = 'auto'

import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'

import '../globals.css'
import '@/fonts/fontawesome.scss'
import '@/fonts/materialdesignicons.scss'
import '@/scss/core.scss'
import '@/scss/theme-default.scss'

import '@/libs/node-waves/node-waves.scss'


import '@/libs/perfect-scrollbar/perfect-scrollbar.scss'
import '@/libs/perfect-scrollbar/perfect-scrollbar.js'

import '@/js/menu.js'
import '@/js/mega-dropdown.js'

import LinksMenuLateral from './_layoutComplements/LinksMenuLateral.jsx'
import Footer from './_layoutComplements/Footer.jsx'
import HeaderMenu from './_layoutComplements/HeaderMenu.jsx'
import NavBar from './_layoutComplements/NavBar.jsx'

const inter = Inter({ subsets: ['latin'] })


export default function DashboardLayout({ children }) {

  return (
    <html 
      lang="es"
      className="light-style layout-navbar-fixed layout-menu-fixed layout-compact"
      dir="ltr"
      data-theme="theme-default"
      data-assets-path="/assets/"
      data-template="vertical-menu-template"
    >
      
      <body className={inter.className}>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
              <HeaderMenu />
              <div className="menu-inner-shadow"></div>
              <LinksMenuLateral />
            </aside>
            <div className="layout-page">
              <NavBar />
              <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                  {children}
                </div>
                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
        <Toaster 
          richColors
          position="top-right"
          toastOptions={{
          style: {
              marginTop: '2rem',
          },
        }}/>
        <Script src="/assets/vendor/js/bootstrap.js" />
        <Script src="/assets/vendor/libs/node-waves/waves.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/config.js" />
        <Script src="/assets/vendor/js/helpers.js" />
        <Script src="/assets/vendor/js/menu.js" />
        <Script src="/assets/js/main.js" />
      </body>
      
    </html>
    
  )
}
