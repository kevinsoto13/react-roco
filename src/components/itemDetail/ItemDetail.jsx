import React, { useContext, useState } from 'react'
import { AlertNotification } from '../alert/AlertNotification'
import { ShopContext } from '../../context/ShopContext'

const ItemDetail = ({product}) => {
    const { handleAddToCart } = useContext(ShopContext)
const [contador, setContador] = useState(1)
  const [openAlert, setOpenAlert] = useState(false)

    const handleAdd = () => {
        handleAddToCart({ ...product, quantity: contador })
        setOpenAlert(true)
        setContador(contador)
      }

    return (
        <>
            <div className="product-detail-container">
                <div className="product-main-content">

                    <div className="product-card">
                        <div className="product-image-container">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="product-image"
                            />
                        </div>

                        <div className="product-info">
                            <h2 className="product-title">{product.nombre}</h2>
                            <p className="product-price">{product.precio} $</p>

                            <div className="quantity-controls">
                                <button
                                    className="btn"
                                    onClick={() => setContador(prev => Math.max(prev - 1, 1))}
                                    disabled={contador <= 1}
                                >
                                    -
                                </button>
                                <p style={{ margin: "0 10px" }}>{contador}</p>
                                <button
                                    className="btn"
                                    onClick={() => setContador(prev => Math.min(prev + 1, 10))}
                                    disabled={contador >= 10}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="btn"
                                onClick={handleAdd}
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    </div>


                    <div className="product-description-section">
                        <div className="description-content">
                            <h3>Descripción del producto</h3>
                            <p className="description-text">
                                {product.descripcion || "Este producto no tiene descripción disponible."}
                            </p>

                            <div className="product-details">
                                <h4>Detalles adicionales</h4>
                                <ul>
                                    <li><strong>Categoría:</strong> {product.idTipoProducto === 1 ? "Ropa" : "Accesorio"}</li>

                                    <li><strong>Disponibilidad:</strong> En stock</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <AlertNotification
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                message={`${contador} ${product.nombre}(s) agregado(s) al carrito!`}
            />
        </>


    )
}

export default ItemDetail