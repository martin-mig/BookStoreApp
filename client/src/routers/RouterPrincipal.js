import React from 'react';
import {Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Header } from '../components/Header';
import { Consultas } from '../components/Consultas';
import { Stock } from '../components/Stock';
import { Libros } from '../components/Libros';
import { Usuarios } from '../components/Usuarios';

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

                        <Route path="*" element={(
                            <>   
                                <h1>Error 404</h1>
                                <strong>Esta página no existe</strong>
                            </> 
                        )} />
                    </Routes>
                </section>
                <hr/>

                <footer>
                    Este es el pie de pagina
                </footer>
            </div>
        </BrowserRouter>
    )
}