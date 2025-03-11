import React from "react";
import { useFetch } from "../../customHooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";


export const ItemListContainer = () => {
  const { data, loading, error } = useFetch("/src/assets/data/productos.json")
  const navigate = useNavigate()
  const { categoryId } = useParams()

  if (loading) return <h2>Cargando...</h2>
  if (error) return <h2>Error...</h2>

  const categoryMapping = {
    ropa: 1,
    accesorios: 2,
  }

  const filteredData = categoryId
    ? data.filter((prod) => prod.idTipoProducto === categoryMapping[categoryId]) 
    : data

  return (
    <section className="conocimiento">
      <h2 className="m-5">{categoryId === 'ropa' ? "Ropa" : categoryId === 'accesorios' ? "Accesorios" : "Productos destacados"}</h2>
      <div id="containerCards" className="wrap">
        {filteredData?.map((prod) => (
          <div key={prod.idProducto} className="box">
            <div className="box-top">
              <img className="box-image" src={`/src/assets/img/${prod.imagen}`} alt={prod.nombre} style={{cursor : "pointer"}} onClick={() => navigate(`/item/${prod.idProducto}`)} />
              <div className="title-flex">
                <h3 className="box-title">{prod.nombre}</h3>
              </div>
              <p>{prod.precio} $</p>
            </div>
            <button className="btn" disabled>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

