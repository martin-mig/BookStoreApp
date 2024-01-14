import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ButtonNB } from '../Button/ButtonNB';

export const Consultas = () => {
    return(
        <>
            <div className="panel-body">
                <div className="tab-content">
                    <div className="tab-pane fade active in" id="home">
                        <div className="imagen_nav">
                            <div className="center_image">
                                <ButtonNB img_url="books.png" alt="Books" nombre="libros"/>
                            </div>
                            <div className="center_image">
                                <ButtonNB img_url="users.png" alt="Users" nombre="usuariosc" />
                            </div>  
                            <div className="center_image">
                                <ButtonNB img_url="stock.png" alt="Stock" nombre="stockc"/>
                            </div>                                
                            <div className="center_image">
                                 <ButtonNB img_url="customer.png" alt="Customers" nombre="clientesc"/>
                            </div>  
                            <div className="center_image">
                                <ButtonNB img_url="sale.png" alt="Sales" nombre="ventasc"/>
                            </div>      
                            <div className="center_image">
                                <ButtonNB img_url="descargas.png" alt="Dowload" nombre="descargasc"/>
                            </div> 
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab1primary">Primary 1</div>
                    <div className="tab-pane fade" id="tab2primary">Primary 2</div>
                    <div className="tab-pane fade" id="tab3primary">Primary 3</div>
                </div>
            </div>

            <div>
                <Outlet></Outlet>
            </div> 
        </>
    )
}