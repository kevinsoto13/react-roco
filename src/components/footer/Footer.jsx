import { Link } from 'react-router-dom';
import instagram from '../../assets/img/instagram.png';
import whatsapp from '../../assets/img/whatsapp.png';

const Footer = () => {
    return (
        <>
        <footer id="footer">
        <p>&copy; 2024 ROCO TRAINER. Todos los derechos reservados.</p>

        <div className="redes-footer">
            <Link to="">
                <img className="redes" src={instagram} alt="instagram"></img>
            </Link>
            <Link to="">
                <img className="redes" src={whatsapp} alt="whatsapp"></img>
            </Link>
        </div>
    </footer>
        </>
    )
}

export default Footer;