import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Home.css'
import flecha_derecha from '../img/chevron-right-regular-24.png'

const Home = () => {
    return (
        <>
        <div class="container">
        <div class="showcase">
            <h2>Ofertas</h2>
            <p>Las Mejores Ofertas al Mejor Precio</p>
            <a href="#" class="btn_home"> Comprar Ahora <img src={flecha_derecha} alt="" /></a>
        </div>
        
        <section class="home-cards">
        <div>
            <img src="https://blogger.googleusercontent.com/img/a/AVvXsEj8lGLL11aq1t4gzjxzDsU-_Xq9XJ5Hrb7nsKhHX78lgCiz2-1sAS_27YvcirCRkxwcFBYuiA9hke0e9SYk58HHX-TMx-DLIrtKKQBPlfa5akCbXLNVey-YjltYUJVs0oLJVCT8a7exffT1WhX-UJt6aJbsdTnCudf1WR5Sjim1lxZ_X5JrGFpdm-UXyHE" alt=""/>
            <h3>iPhone 15 Pro max</h3>
            <p>El nuevo producto de apple ya con nosotros, con la novedad del puerto USB-C</p>
                <a href="#">Leer Mas <i class="fas fa-chevron-right"></i></a>
        </div>
        <div>
            <img src="https://blogger.googleusercontent.com/img/a/AVvXsEilUFU5knpjpNV9P-4CLHVJvzirk0zWZPlyKyNpMzNhV6WTzsIrF46x0txhPZO9Oqe02RnuZ1abtpZis8ItSvOON-IhbKm8djDxad0uNXWfgeZhtvZVCoUjACwePD34-FA9u_sLiME28BW3IFGNN_rofxfACDoGXeAzYIAWK3vCG3oOIsDyf3uKRH_hRS8" alt="" />
            <h3>PS5</h3>
            <p>La ultima consola de Sony PlayStation ya en nuestra tienda en linea</p>
                <a href="#">Leer Mas <i class="fas fa-chevron-right"></i></a>
        </div>
        <div>
            <img src="https://i.ibb.co/2cnshH6/card3.png" alt="" />
            <h3>Xbox One + Control Gratis</h3>
            <p>Compra una Xbox one s y haz el doble de diversion con el control gratis</p>
                <a href="#">Leer Mas <i class="fas fa-chevron-right"></i></a>
        </div>
        <div>
            <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjujgVnfGadRUZXbn91cx35XSxUz-sLyxS6_o5Ea69j8uoaShQ3XGaUeEBeEY5gpudrLXq4kUNoXjP991SOwZ1j9eja1An8ewptge80FdbJfJm4XwCwtqFVg6cuNzUbSwbfH4TBKDF77iiQJlpVcpG4m6GKK81kfoqJ7eMLo4ALdCavFB6DfkVVMq8vAZc" alt="" />
            <h3>Laptop Acer Nitro 5</h3>
            <p>La mejor laptop calidad precio del mercado</p>
                <a href="#">Leer Mas <i class="fas fa-chevron-right"></i></a>
        </div>
    </section>
    </div></>
    );
}

export default Home;