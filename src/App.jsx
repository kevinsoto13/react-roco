import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ItemListContainer } from './components/itemListContainer/itemListContainer'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/hero'
import Footer from './components/footer/Footer'
import { ItemDetailContainer } from './components/itemDetailContainer/ItemDetailContainer'

function App() {
  

  return (
    <BrowserRouter>
     <Navbar></Navbar>
     <Hero></Hero>
     <Routes>
        <Route exact path="/" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
     </Routes>
     <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
