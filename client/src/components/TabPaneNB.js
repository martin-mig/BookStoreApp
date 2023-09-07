import React from 'react';
import { ButtonNB } from './ButtonNB';

export const TabPaneNB = (props) => {
    const handleCambioContenido = (contenido) => {
        props.cambiarContenido(contenido);
      };

    return(
        <>
        <div className="tab-pane fade active in" id={props.tab_id}>
            <div className="imagen_nav">
                <ButtonNB img_url="books.png" alt="imagen_books" nombre="Books"/>
                <ButtonNB img_url="users.png" alt="imagen_users" nombre="Users" />
                <ButtonNB img_url="stock.png" alt="imagen_stock" nombre="Stock"/>
                <ButtonNB img_url="customer.png" alt="imagen_customer" nombre="Customers"/>
                <ButtonNB img_url="sale.png" alt="imagen_sale" nombre="Sales"/>
            </div>
        </div>
        </>
    )
}
