import 'bootstrap/dist/css/bootstrap.css'


import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../Components/Navbar'
import { useEffect } from 'react'



function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap')
    })

  return (
      <>
        <Navbar />
        <Component {...pageProps} />
      </>
  )
}
export default MyApp
