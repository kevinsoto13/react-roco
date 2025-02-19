import './App.css'
import { ItemListContainer } from './components/itemListContainer/itemListContainer'
import Navbar from './components/navbar/Navbar'

function App() {
  const greeting = 'Hola Bienvenidos a ROCO TRAINER'

  return (
    <>
     <Navbar></Navbar>
     <ItemListContainer greeting={greeting}></ItemListContainer>
    </>
  )
}

export default App
