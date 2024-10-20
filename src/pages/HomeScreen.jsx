import { useState } from 'react'
import '../App.css'
import Header from '../Components/header/Header'
import Navbar from '../Components/Navbar/Navbar'
import Brand from '../Components/brands/Brand'
import Detail from '../Components/details/Detail'
import FAQ from '../Components/FAQ/FAQ'
import Footer from '../Components/footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Header/>
    <Brand/>
    <Detail/>
    <FAQ/>
    <Footer/>
    </>
  )
}

export default App

