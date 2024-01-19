import React from 'react';
import { Card } from 'primereact/card';

export const CarritoVacio = () => {
    return (
        <>
            <Card title="Carrito vacío">
                <p className='m-0'>
                        No hay ningún libro en el carrito.
                </p>
            </Card>
        </>
    )
}