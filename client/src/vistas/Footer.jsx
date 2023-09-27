import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/footer.css'
import pagar from '../img/dollar-circle-solid-24.png'
import visa from '../img/visa-logo-24.png'
import mastercard from '../img/mastercard-logo-24.png' 
import paypal from '../img/paypal-logo-24.png'
import efectivo from '../img/money-regular-24.png'
import transfer from '../img/transfer-regular-24.png'
import facebook from '../img/facebook-square-logo-48.png'
import twitter from '../img/twitter-logo-48.png'
import linkedin from '../img/linkedin-square-logo-48.png'
import youtube from '../img/youtube-logo-48.png'
import instagram from '../img/instagram-logo-48.png'
import whatsapp from '../img/whatsapp-logo-48.png'

const footer = () => {
    const openLinkInNewTab = (url) => {
        window.open(url, '_blank'); };
    return (
        <>
            <div class="container">
                <section class="follow">
                    <p>Siguenos en nuestras redes</p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://facebook.com')}><img src={facebook}alt="Facebook" title='Facebook'/> </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://twitter.com')}><img src={twitter} alt="Twitter" title='Twitter'/></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://linkedin.com')}><img src={linkedin} alt="Linkedin" title='Linkedin'/></a>
                    <a href="https://Youtube.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://Youtube.com')}><img src={youtube} alt="Youtube" title='Youtube'/></a>
                    <a href="https://Instagram.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://Instagram.com')}><img src={instagram} alt="Instagram"title='Instagram' /></a>
                    <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" onClick={() => openLinkInNewTab('https://web.whatsapp.com')}><img src={whatsapp} alt="Whatsapp" title='WhatsApp'/></a>
                </section>
                <section class="links">
                    <div class="links-inner">
                        <ul>
                            <li><h3>¿Que hay de nuevo?</h3></li>
                            <li><a href="#">Surface Pro X</a></li>
                            <li><a href="#">Surface Laptop 3</a></li>
                            <li><a href="#">Surface Pro 7</a></li>
                            <li><a href="#">PlayStation 5</a></li>
                            <li><a href="#">PlayStation 4</a></li>
                        </ul>
                        <ul>
                            <li><h3>Microsoft Store</h3></li>
                            <li><a href="#">Account Profile</a></li>
                            <li><a href="#">Download Center</a></li>
                            <li><a href="#">Microsoft Store support</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Older tracking</a></li>
                        </ul>
                        <ul>
                            <li><h3>Education</h3></li>
                            <li><a href="#">Microsfot in education</a></li>
                            <li><a href="#">Office for students</a></li>
                            <li><a href="#">Office 365 for schools</a></li>
                            <li><a href="#">Deals for studentss</a></li>
                            <li><a href="#">Microsfot Azure</a></li>
                        </ul>
                        <ul>
                            <li><h3>Enterprise</h3></li>
                            <li><a href="#">Azure</a></li>
                            <li><a href="#">AppSource</a></li>
                            <li><a href="#">Automotive</a></li>
                            <li><a href="#">Government</a></li>
                            <li><a href="#">Healthcare</a></li>
                        </ul>
                        <ul>
                            <li><h3>Developer</h3></li>
                            <li><a href="#">Visual Studio</a></li>
                            <li><a href="#">Windowszs Dev Center</a></li>
                            <li><a href="#">Developer Network</a></li>
                            <li><a href="#">TechNet</a></li>
                            <li><a href="#">Microsoft Developer</a></li>
                        </ul>
                        <ul>
                            <li><h3>Company</h3></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">About Microsoft</a></li>
                            <li><a href="#">Company news</a></li>
                            <li><a href="#">Privacy at Microsoft</a></li>
                            <li><a href="#">Inverstors</a></li>
                        </ul>
                    </div>
                </section>
                <footer class="footer">
                    <div class="footer-inner">
                        <ul>
                            <li> <img className = "pago" src={pagar} alt="" />    Metodos de pago</li>
                        </ul>
                        <ul>    
                            <li> <img className = "pago" src={visa} alt="" title='Visa'/></li>
                            <li> <img className = "pago" src={mastercard} alt="" title='Master-Card'/></li>
                            <li> <img className = "pago" src={paypal} alt="" title='PayPal'/></li>
                            <li> <img className = "pago" src={efectivo} alt="" title='Efectivo'/></li>
                            <li> <img className = "pago" src={transfer} alt="" title='Transferencia'/></li>
                        </ul>
                    </div>
                </footer>
            </div></>
    );
}

export default footer;