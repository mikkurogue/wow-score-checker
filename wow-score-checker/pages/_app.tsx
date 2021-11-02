import 'bootstrap/dist/css/bootstrap.css'


import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import Footer from '../components/Footer'



function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap')
    })

  return (
      <>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
  )
}
export default MyApp
