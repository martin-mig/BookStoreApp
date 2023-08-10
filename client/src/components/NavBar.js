import React from 'react'

export const NavBar = () => {
    return(
        <>
            <div className="panelnav with-nav-tabs panel-primary">
                <div className="panel-heading">
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#home">Consultas</a></li>
                        <li ><a data-toggle="tab" href="#tab1primary">Stock</a></li>
                        <li><a data-toggle="tab" href="#tab2primary">Venta</a></li>
                        <li><a data-toggle="tab" href="#tab3primary">Clientes</a></li>
                        <li><a data-toggle="tab" href="#tab4primary">Usuarios</a></li>
                        <li><a data-toggle="tab" href="#tab5primary">Sistema</a></li>
                    </ul>
                </div> 
                <div className="panel-body">
                    <div className="tab-content">
                        <div className="tab-pane fade active in" id="consulta">
                            <div className="imagen_nav">
                                <div className="center_image">
                                    <button type="button">  
                                        <img src={require('../images/search.png')} alt="imagen_search"  className="each_imagen_nav"></img>
                                    </button>
                                    <p><strong>Libros</strong></p>
                                </div>
                                <div className="center_image">
                                    <button type="button">  
                                        <img src={require('../images/users.png')} alt="imagen_users" className="each_imagen_nav"></img>
                                    </button>
                                    <p><strong>Usuarios</strong></p>
                                </div>  
                                <div className="center_image">
                                    <button type="button">  
                                        <img src={require('../images/stock.png')} alt="imagen_stock" className="each_imagen_nav"></img>
                                    </button>
                                    <p><strong>Stock</strong></p>
                                </div>    
                                <div className="center_image">
                                    <button type="button">  
                                        <img src={require('../images/customer.png')} alt="Imagen_customer" className="each_imagen_nav"></img>
                                    </button>
                                    <p><strong>Clientes</strong></p>
                                </div>  
                                <div className="center_image">
                                    <button type="button">  
                                        <img src={require('../images/sale.png')} alt="imagen_sale" className="each_imagen_nav"></img>
                                    </button>
                                    <p><strong>Ventas</strong></p>
                                </div>      

                            </div>
                        </div>
                        <div className="tab-pane fade" id="stock">Primary 1</div>
                        <div className="tab-pane fade" id="tab2primary">Primary 2</div>
                        <div className="tab-pane fade" id="tab3primary">Primary 3</div>
                    </div>
                </div>   
             </div>    
        </>
    )
}