import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/client"

import CircularIndeterminate from "../spinner/CircularIndeterminate"

import ItemDetail from "../itemDetail/ItemDetail"

export const ItemDetailContainer = () => {
  const { id } = useParams()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  

  const getProduct = async () => {
    try {
      if (!id) return

      const productRef = doc(db, "products", id)
      const docSnap = await getDoc(productRef)

      if (docSnap.exists()) {
        const productData = { id: docSnap.id, ...docSnap.data() }
        setProduct(productData)
      } else {
        console.log('No se encontró el producto')
        setProduct(null)
      }
    } catch (error) {
      console.error('Error al obtener producto:', error)
    } finally {
      setLoading(false)
    }
  }

  


  useEffect(() => {
    getProduct()
  }, [id])

  if (loading) {
    return <CircularIndeterminate />
  }

  return (

    <>
      <section className="Item" >
        <ItemDetail  key={product.id} product={product}/>
      </section>
    </>
  )
}
