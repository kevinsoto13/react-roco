import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Route, useNavigate } from "react-router-dom";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const Cart = () => {
    const navigate = useNavigate()

    const { cart, handleRemoveFromCart, updateCartItemQuantity, clearCart } = useContext(ShopContext)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [errors, setErrors] = useState({})
    const [orderCompleted, setOrderCompleted] = useState(false)
    const [orderId, setOrderId] = useState('')

    const imageModules = import.meta.glob("../../assets/img/*.{jpg,png}", { eager: true })

    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop()
            return [fileName, module.default]
        })
    )

    const handleClickOpen = () => {
        setOpen(true)
        setOrderCompleted(false)
    }

    const handleClose = () => {
        setOpen(false)
        setErrors({})
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Nombre es requerido'
        if (!formData.email) {
            newErrors.email = 'Email es requerido'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email no válido'
        }
        if (!formData.phone) {
            newErrors.phone = 'Teléfono es requerido'
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Solo números permitidos'
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {

            const newOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`
            setOrderId(newOrderId)
            setOrderCompleted(true)

        }
    }

    const handleFinalizeOrder = () => {
        clearCart()
        setOpen(false)
        setFormData({ name: '', email: '', phone: '' })

    }

    const total = cart.reduce((sum, product) => sum + (product.precio * product.quantity), 0)

    return (
        <section className="conocimiento">
            <h2>Tu carrito</h2>
            {cart.length === 0 ? (
                <p>No tienes productos en el carrito.</p>
            ) : (
                <div>
                    <div className="cart-items-container">  {/* Contenedor para los items */}
                        {cart.map((product, index) => (
                            <div key={`${product.idProducto ?? index}-${index}`} className="cart-item">
                                <img src={images[product.imagen]} alt={product.nombre} className="cart-item-image" style={{ cursor: "pointer" }} onClick={() => navigate(`/item/${product.idProducto}`)} />
                                <div className="cart-item-details">
                                    <h3>{product.nombre}</h3>

                                    <p>Precio: {product.precio} $</p>
                                    <p>Total: {product.precio * product.quantity} $</p>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '15px 0' }}>
                                        <button
                                            className="btn"
                                            onClick={() => updateCartItemQuantity(product.idProducto, product.quantity - 1)}
                                            style={{ cursor: product.quantity > 1 ? "pointer" : "not-allowed" }}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </button>

                                        <p style={{ margin: "0 10px" }}>{product.quantity}</p>

                                        <button
                                            className="btn"
                                            onClick={() => updateCartItemQuantity(product.idProducto, product.quantity + 1)}
                                            disabled={product.quantity >= 10}
                                            style={{ cursor: product.quantity < 10 ? "pointer" : "not-allowed" }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button className="btn" onClick={() => handleRemoveFromCart(product.idProducto)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <p>Total: {cart.reduce((total, product) => total + product.precio * product.quantity, 0)} $</p>
                        <div className="cart-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button
                                className="btn"
                                onClick={clearCart}

                            >
                                Vaciar carrito
                            </button>
                            <button
                                className="btn"
                                onClick={handleClickOpen}

                            >
                                Proceder al pago
                            </button>
                        </div>

                        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                            {!orderCompleted ? (
                                <form onSubmit={handleSubmit}>
                                    <DialogTitle>Finalizar compra</DialogTitle>
                                    <DialogContent>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                                            <TextField
                                                label="Nombre completo"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Teléfono"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                                fullWidth
                                            />

                                            <div>
                                                <h4>Resumen de compra</h4>
                                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                                    {cart.map(item => (
                                                        <li key={item.idProducto} style={{ marginBottom: '10px' }}>
                                                            {item.nombre} - {item.quantity} x {item.precio} $ = {item.quantity * item.precio} $
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                                                    Total: {total} $
                                                </p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <button className="btn" onClick={handleClose}>Cancelar</button>
                                        <button className="btn" type="submit" >
                                            Confirmar compra
                                        </button>
                                    </DialogActions>
                                </form>
                            ) : (
                                <>
                                    <DialogTitle>¡Compra realizada con éxito!</DialogTitle>
                                    <DialogContent>
                                        <Alert
                                            icon={<CheckIcon fontSize="inherit" />}
                                            severity="success"
                                            sx={{ marginBottom: '20px' }}
                                        >
                                            Tu orden #{orderId} ha sido procesada correctamente.
                                        </Alert>
                                        <div>
                                            <h4>Detalles de la orden:</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {cart.map(item => (
                                                    <li key={item.idProducto} style={{ marginBottom: '10px' }}>
                                                        {item.nombre} - {item.quantity} x {item.precio} $ = {item.quantity * item.precio} $
                                                    </li>
                                                ))}
                                            </ul>
                                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                                                Total pagado: {total} $
                                            </p>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <button
                                            className="btn"
                                            onClick={handleFinalizeOrder}
                                        >
                                            Finalizar
                                        </button>
                                    </DialogActions>
                                </>
                            )}
                        </Dialog>

                    </div>


                </div>
            )}
        </section>
    )
}