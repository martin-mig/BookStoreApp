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
                            <li  id="stock" className="disabled" >
                                <NavLink 
                                    to="/stock"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                }
   
                                >Stock </NavLink>
                            </li>
                            <li  id="venta" className="disabled">
                                <NavLink 
                                    to="/venta"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Sale </NavLink>
                            </li>
                            <li  id="clientes" className="disabled">
                                <NavLink 
                                    to="/clientes"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Customers </NavLink>
                            </li>
                            <li  id="usuarios" className="disabled">
                                <NavLink 
                                    to="/usuarios"
                                   className={
                                    ({isActive}) => {
                                        return isActive ? "active" : "";
                                    }
                                   }
   
                                >Users </NavLink>
                            </li>
                            <li  id="sistem" className="disabled">
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