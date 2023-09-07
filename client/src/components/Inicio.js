import React from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom';

export const Inicio = () => {
    return(
        <>
            <div className="panelnav with-nav-tabs panel-primary">
                    <div className="panel-heading">
                        <ul className="nav nav-tabs">
                            <li  id="consultas">
                                <NavLink variant="pills"
                                    to="/consultas"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Consultas </NavLink>
                            </li>
                            <li  id="stock">
                                <NavLink 
                                    to="/stock"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Stock </NavLink>
                            </li>
                            
                            <li><a data-toggle="tab" href="#tab2primary">Venta</a></li>
                            <li><a data-toggle="tab" href="#tab3primary">Clientes</a></li>
                            <li><a data-toggle="tab" href="#tab4primary">Usuarios</a></li>
                            <li><a data-toggle="tab" href="#tab5primary">Sistema</a></li>
                        </ul>
                    </div> 
                    
            </div>  
        </>
    )
}