import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";
import { ItemList } from "../itemList/itemList";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../spinner/CircularIndeterminate";


export const ItemListContainer = () => {
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const productRef = collection(db, 'products')

  const getProducts = async () => {
    const data = await getDocs(productRef)
    const dataFiltrada = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    console.log(dataFiltrada)
    setProducts(dataFiltrada)
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
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

