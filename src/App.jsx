import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ItemListContainer } from './components/itemListContainer/itemListContainer'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/hero'
import Footer from './components/footer/Footer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { ShopComponentContext } from './context/ShopContext'
import { Cart } from './components/cart/cart'

function App() {


  return (
    <ShopComponentContext>
      <BrowserRouter>
        <Navbar></Navbar>
        <Hero></Hero>
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </ShopComponentContext>
  )
}

export default App
