import React from 'react';
import {Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Header } from '../components/Header';
import { Consultas } from '../components/Tabs/Consultas';
import { Stock } from '../components/Tabs/Stock';
import { Venta } from '../components/Tabs/Venta';
import { Clientes } from '../components/Tabs/Clientes';
import { Usuarios } from '../components/Tabs/Usuarios';
import { Sistema } from '../components/Tabs/Sistema';
import { Libros } from '../components/Button/Libros';
import { Error } from '../components/Error';
import { Footer } from '../components/Footer';
import { StockC } from '../components/Button/StockC'; 
import { ClientesC } from '../components/Button/ClientesC'; 
import { VentasC } from '../components/Button/VentasC'; 
import { UsuariosC } from '../components/Button/UsuariosC'; 
import { DescargaC } from '../components/Button/DescargaC';
import { FinalizarCompra } from '../components/Button/FinalizarCompra';

export const RouterPrincipal = () => {
    return (
        <BrowserRouter>
            <div>
                <Header></Header>
                <Inicio></Inicio>
                <section className='mb-4'>
                    <Routes>
                        <Route path="/" element={<Navigate to="/consultas" />} />
                        <Route path="/consultas/*" element={<Consultas />}>
                            <Route path="libros" element={<Libros />} />
                            <Route path="usuariosc" element={<UsuariosC />} />
                            <Route path="stockc" element={<StockC />} />
                            <Route path="clientesc" element={<ClientesC />} />
                            <Route path="ventasc" element={<VentasC />} />
                            <Route path="descargasc" element={<DescargaC />} />
                            <Route path="finalizar-compra" element={<FinalizarCompra />} />
                        </Route>
                        <Route path="/stock" element={<Stock />} />
                        <Route path="/venta" element={<Venta />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/sistema" element={<Sistema />} />
                        <Route path="*" element={<Error/>} />
                    </Routes>
                </section>
            
                <Footer></Footer>
            </div>
        </BrowserRouter>
    )
}