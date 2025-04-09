import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Item } from '../Item/Item'

export const ItemList = ({products}) => {
    const { categoryId } = useParams()

    const categoryMapping = {
        ropa: 1,
        accesorios: 2,
    }

    const filteredData = categoryId
        ? products.filter((prod) => prod.idTipoProducto === categoryMapping[categoryId])
        : products

    return (
        <section className="conocimiento">
            <h2 className="m-5">{categoryId === 'ropa' ? "Ropa" : categoryId === 'accesorios' ? "Accesorios" : "Productos destacados"}</h2>
            <div id="containerCards" className="wrap">
                {filteredData?.map((product) => <Item key={product.id} producto={product} />)}
            </div>
        </section>
    )
}