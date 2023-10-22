import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [codigoUser, setCodigoUser] = useState(null);
  //const [Direccion, setCodigoUser] = useState(null);
  const [direccionList, setDireccionList] = useState([]);

  const login = (username) => {
    setLoggedInUser(username);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  const codigo = (codigoUsers) => {
    setCodigoUser(codigoUsers);
    
    axios.get(`http://localhost:3001/Credenciales/lista/${codigoUsers}`).then((response) => {
      setDireccionList(response.data);
    })
  };

  return (
    <AuthContext.Provider value={{ loggedInUser,codigoUser, login, logout,codigo,direccionList }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);