import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { Alert } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check'
import Snackbar from '@mui/material/Snackbar';
import { AlertNotification } from "../alert/AlertNotification"
import PropTypes from "prop-types"

const imageModules = import.meta.glob("../../assets/img/*.{jpg,png}", { eager: true })

const images = Object.fromEntries(
  Object.entries(imageModules).map(([path, module]) => {
    const fileName = path.split("/").pop() // ej: "cap.jpg"
    return [fileName, module.default]
  })
)

export const Item = ({ producto }) => {
    const navigate = useNavigate()
    const { handleAddToCart } = useContext(ShopContext)
    const [openAlert, setOpenAlert] = useState(false)

    const handleAdd = () => {
        handleAddToCart({ ...producto, quantity: 1 });
        setOpenAlert(true);
    };



    return (
        <div key={producto.idProducto || producto.id} className="box">
            <div className="box-top">
                <img className="box-image" src={images[producto.imagen]} alt={producto.nombre} style={{ cursor: "pointer" }} onClick={() => navigate(`/item/${producto.idProducto}`)} />
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

Item.propTypes = {
  producto: PropTypes.shape({
    idProducto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    idTipoProducto: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
}