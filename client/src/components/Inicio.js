import React from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom';

export const Inicio = () => {
    return(
        <>
            <div className="panelnav with-nav-tabs panel-primary">
                    <div className="panel-heading">
                        <ul className="nav nav-tabs">
                            <li  id="consultas">
                                <NavLink 
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
                            <li  id="venta">
                                <NavLink 
                                    to="/venta"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Venta </NavLink>
                            </li>
                            <li  id="clientes">
                                <NavLink 
                                    to="/clientes"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Clientes </NavLink>
                            </li>
                            <li  id="usuarios">
                                <NavLink 
                                    to="/usuarios"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Usuarios </NavLink>
                            </li>
                            <li  id="usuarios">
                                <NavLink 
                                    to="/sistema"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >sistema </NavLink>
                            </li>
                        </ul>
                    </div> 
                    
            </div>  
        </>
    )
}