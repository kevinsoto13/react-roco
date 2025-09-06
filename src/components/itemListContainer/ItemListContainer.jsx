import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";
import { ItemList } from "../itemList/itemList";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../spinner/CircularIndeterminate";
import productos from "../../assets/data/productos.json"

export const ItemListContainer = () => {
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const productRef = collection(db, 'products')
  const useFirestore = false

  const getProductsFromFirestore = async () => {
    try {
      const data = await getDocs(productRef)
      const dataFiltrada = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log("Firestore:", dataFiltrada)
      setProducts(dataFiltrada)
    } catch (error) {
      console.error("Error al obtener productos de Firestore:", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
  if (useFirestore) {
    getProductsFromFirestore()
  } else {
    setProducts(productos)
    setLoading(false)
  }
}, [])

  if(loading) {
    return <CircularIndeterminate />
  }
  return (
    <>
    {products.length > 0 ? <ItemList products={products}/> : <div>No hay productos</div>}
    </>
  );
};

