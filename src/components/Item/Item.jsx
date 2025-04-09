import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { Alert } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check'
import Snackbar from '@mui/material/Snackbar';
import { AlertNotification } from "../alert/AlertNotification"

export const Item = ({ producto }) => {
    const navigate = useNavigate()
    const { handleAddToCart } = useContext(ShopContext)
    const [openAlert, setOpenAlert] = useState(false)

    const handleAdd = () => {
        handleAddToCart({ ...producto, quantity: 1 });
        setOpenAlert(true);
    };



    return (
        <div key={producto.id} className="box">
            <div className="box-top">
                <img className="box-image" src={producto.imagen} alt={producto.nombre} style={{ cursor: "pointer" }} onClick={() => navigate(`/item/${producto.id}`)} />
                <div className="title-flex">
                    <h3 className="box-title">{producto.nombre}</h3>
                </div>
                <p>{producto.precio} $</p>
            </div>


            <button className="btn" style={{ cursor: "pointer" }} onClick={() => handleAdd()}> 
                Add to cart
            </button>


            <AlertNotification
                        open={openAlert}
                        onClose={() => setOpenAlert(false)}
                        message={`${producto.nombre} agregado al carrito!`}
                      />
        </div>
    )
}