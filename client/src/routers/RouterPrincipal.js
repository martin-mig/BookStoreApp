import React from 'react';
import {Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Header } from '../components/Header';
import { Consultas } from '../components/Tabs/Consultas';
import { Stock } from '../components/Tabs/Stock';
import { Libros } from '../components/Libros';
import { Usuarios } from '../components/Usuarios';
import { Error } from '../components/Error';
import { Footer } from '../components/Footer';
 
export const RouterPrincipal = () => {
    return (
        <BrowserRouter>
            <div>
                <Header></Header>
                <Inicio></Inicio>
                <section>

                    <Routes>
                        <Route path="/" element={<Consultas />} />
                        <Route path="/consultas/*" element={<Consultas />}>
                            <Route path="libros" element={<Libros />} />
                            <Route path="usuarios" element={<Usuarios />} />
                        </Route>
                        <Route path="/stock" element={<Stock />} />
                        <Route path="*" element={<Error/>} />
                    </Routes>
                </section>
            
                <Footer></Footer>
            </div>
        </BrowserRouter>
    )
}