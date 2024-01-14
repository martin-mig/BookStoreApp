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
   
                                >Searchs </NavLink>
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
   
                                >Sale </NavLink>
                            </li>
                            <li  id="clientes">
                                <NavLink 
                                    to="/clientes"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Customers </NavLink>
                            </li>
                            <li  id="usuarios">
                                <NavLink 
                                    to="/usuarios"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Users </NavLink>
                            </li>
                            <li  id="usuarios">
                                <NavLink 
                                    to="/sistema"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Sistem </NavLink>
                            </li>
                        </ul>
                    </div> 
                    
            </div>  
        </>
    )
}