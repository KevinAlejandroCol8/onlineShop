
import '../css/Payment.css'
import mc from '../img/mc.png'
import vi from '../img/vi.png'
import pp from '../img/pp.png'
import React, { useState } from "react";

const Payment = () => {
    const [cardNumber, setCardNumber] = useState("");

    const handleInputChange = (e) => {
        let inputValue = e.target.value.replace(/\s/g, "");

        if (inputValue.length > 0) {
            inputValue = inputValue.match(new RegExp(".{1,4}", "g")).join(" ");
        }
        setCardNumber(inputValue);
    };

    return (
        <div className="divpago">
            <div class="tab_container">
                <input className="inputpagofinal" id="tab1" type="radio" name="tabs" />
                <input className="inputpagofinal" id="tab2" type="radio" name="tabs" />
                <input className="inputpagofinal" id="tab3" type="radio" name="tabs" />
                <input className="inputpagofinal" id="tab4" type="radio" name="tabs" checked />
                <section id="content4" class="tab-content">
                    <h4 class="payment-title">Escóga su metodo de pago</h4>
                    <form action="" method="post">
                        <div class="pymt-radio">


                            <div class="row-payment-method payment-row">
                                <div class="select-icon">
                                    <input type="radio" id="radio1" name="radios" value="pp" />
                                    <label for="radio1"></label>
                                </div>
                                <div class="select-txt">
                                    <p class="pymt-type-name">Paypal</p>
                                    <p class="pymt-type-desc">Pago seguro en línea. Se necesita tarjeta de crédito. No es
                                        necesaria cuenta PayPal.</p>
                                </div>
                                <div class="select-logo">
                                    <img src={pp} alt="PayPal" />
                                </div>

                            </div>

                        </div>
                        <div class="pymt-radio">

                            <div class="row-payment-method payment-row-last">
                                <div class="select-icon hr">
                                    <input type="radio" id="radio2" name="radios" value="pp" checked />
                                    <label for="radio2"></label>
                                </div>
                                <div class="select-txt hr">
                                    <p class="pymt-type-name">Pago con Tarjeta</p>
                                    <p class="pymt-type-desc">Transferencia de dinero segura utilizando su cuenta bancaria. Pago
                                        seguro en línea. Se necesita tarjeta de crédito. Visa, Discover, American Express,
                                        MasterCard</p>
                                </div>
                                <div class="select-logo">
                                    <div class="select-logo-sub logo-spacer">
                                        <img src={vi} alt="Visa" />
                                    </div>
                                    <div class="select-logo-sub">
                                        <img src={mc}
                                            alt="MasterCard" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-cc">
                            <div class="row-cc">
                                <div class="cc-field">
                                    <div class="cc-title">Número de la tarjeta
                                    </div>
                                    <input
                                        type="text"
                                        className="input cc-txt text-validated"
                                        maxLength="19" // 16 digits + 3 spaces
                                        placeholder="#### #### #### ####"
                                        value={cardNumber}
                                        onChange={handleInputChange}
                                    /> </div>
                            </div>
                            <div class="row-cc">
                                <div class="cc-field">
                                    <div class="cc-title">Fecha de Expiración
                                    </div>
                                    <select class="input cc-ddl">
                                        <option selected>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                    <select class="input cc-ddl">
                                        <option selected>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>31</option>
                                    </select>
                                </div>
                                <div class="cc-field">
                                    <div class="cc-title">Código CVV<span class="numberCircle">?</span>
                                    </div>
                                    <input type="text" class="input cc-txt" maxlength="3" placeholder="###" />
                                </div>
                            </div>
                            <div class="row-cc">
                                <div class="cc-field">
                                    <div class="cc-title">Nombre del titular de la tarjeta
                                    </div>
                                    <input type="text" class="input cc-txt" />
                                </div>
                            </div>

                        </div>
                        <div class="button-master-container">
                            <div class="button-container button-finish"><a href="#">Finalizar Orden</a>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Payment;