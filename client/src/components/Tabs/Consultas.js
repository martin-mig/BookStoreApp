import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export const Consultas = () => {
    return(
        <>
            <div className="panel-body">
                <div className="tab-content">
                    <div className="tab-pane fade active in" id="home">
                        <div className="imagen_nav">
                            <div className="center_image">
                                <Link to="libros">
                                    <button type="button" >  
                                        <img src={require('../../images/search.png')} alt="imagen_search"  className="each_imagen_nav"></img>
                                    </button>
                                </Link>    
                                <p><strong>Libros</strong></p>
                            </div>
                            <div className="center_image">
                                <Link to="usuarios">
                                    <button type="button">  
                                        <img src={require('../../images/users.png')} alt="imagen_users" className="each_imagen_nav"></img>
                                    </button>
                                </Link> 
                                <p><strong>Usuarios</strong></p>
                            </div>  
                            <div className="center_image">
                                <button type="button">  
                                    <img src={require('../../images/stock.png')} alt="imagen_stock" className="each_imagen_nav"></img>
                                </button>
                                <p><strong>Stock</strong></p>
                            </div>    
                            <div className="center_image">
                                <button type="button">  
                                    <img src={require('../../images/customer.png')} alt="Imagen_customer" className="each_imagen_nav"></img>
                                </button>
                                <p><strong>Clientes</strong></p>
                            </div>  
                            <div className="center_image">
                                <button type="button">  
                                    <img src={require('../../images/sale.png')} alt="imagen_sale" className="each_imagen_nav"></img>
                                </button>
                                <p><strong>Ventas</strong></p>
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