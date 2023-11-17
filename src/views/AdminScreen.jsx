import React, { useState } from 'react'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import FormApp from '../components/FormApp';
import StockAdminApp from '../components/StockAdminApp';
import UserAdminApp from '../components/UserAdminApp';


const AdminScreen = ({darkMode}) => {
const [openMP, setOpenMP] = useState(false);

const handleOpenMP = () => {
  setOpenMP(!openMP);
  console.log("openMP in AdminScreen:", openMP);
};
    return (
      <div className='pb-2'>
        <h1 className={`text-center ${darkMode ? "text-light" : ""}`}>
          Pagina Admin
        </h1>
        <StockAdminApp openMP={openMP} handleOpenMP={handleOpenMP}></StockAdminApp>
        <UserAdminApp></UserAdminApp>
      </div>
    );
}

export default AdminScreen