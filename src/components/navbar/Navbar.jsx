import React from 'react'
import logo from '../../assets/img/logo.png'
import { CartWidget } from '../cartWidget/CartWidget';

const Navbar = () => {
  return (
    <>
        <header>
        <div>
            <img className="logo" src={logo} alt="ROCO TRAINER"></img>
        </div>
        <nav>
            <ul>
                <li><a >Ropa</a></li>
                <li><a >Accesorios</a></li>
            </ul>
        </nav>
        <div className="redes-container">
            <CartWidget></CartWidget>
        </div>

        
    </header>
    </>
    
  )
}

export default Navbar