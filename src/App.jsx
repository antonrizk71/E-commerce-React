
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'

import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Footer from './components/Footer/Footer'
import banner_mens from './components/Assets/banner_mens.png'
import banner_kids from './components/Assets/banner_kids.png'
import banner_women from './components/Assets/banner_women.png'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'


function App() {


  return (
    <>

      <BrowserRouter basename="/E-commerce-React">
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={banner_mens} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={banner_women} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={banner_kids} category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
            <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart />} />
           <Route path='/signup' element={<Signup />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
