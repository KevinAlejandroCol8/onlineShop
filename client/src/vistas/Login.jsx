import React, { useState } from "react";
import Modal from "react-modal";
import styles from '../css/LoginStyle.css';

const Login = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const openModal = (isSignUp) => {
        setIsSignUp(isSignUp);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div>
            <Modal>
                <div className={styles.container}>
                    hola
                </div>
            </Modal>
        </div>
    );
};

export default Login;
