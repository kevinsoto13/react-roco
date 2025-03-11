import { useParams } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch";
import { useEffect, useState } from "react";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/src/assets/data/productos.json`);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (data) {
      const prod = data.find((prod) => prod.idProducto === parseInt(id));
      setProducto(prod);
    }
  }, [data, id]);

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Error...</h2>;
  if (!producto) return <h2>Producto no encontrado</h2>;
  return (
    <section className="conocimiento">
      <h2 className="m-5">{producto.idProducto === 1 ? 'ropa' : 'accesorio'}</h2>
      <div id="containerCards" className="wrap" style={{gridTemplateColumns: "none"}}>
        <div className="box">
          <div className="box-top">
            <img
              className="box-image"
              src={`/src/assets/img/${producto.imagen}`}
              alt={producto.nombre}
            />
            <div className="title-flex">
              <h3 className="box-title">{producto.nombre}</h3>
            </div>
            <p>{producto.precio} $</p>
          </div>
          <button className="btn" disabled>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};
