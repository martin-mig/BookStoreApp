import React, { useEffect, useId, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

export const Carrito = ({datoCarrito, setdatoCarrito, contadorBadger, setBadgerContador, msj}) =>{

    const [titulo, setTitulo] = useState("");
    const [price, setPrice] = useState("");
    const [imagen, setImagen] = useState("");
    const toast = useRef(null);
    const inputRef = useRef(null);
 
    
    useEffect(() => {
        if (!(localStorage.getItem('products') === null)) {
            const datosGuardadosString = localStorage.getItem('products');
            const datosGuardados = JSON.parse(datosGuardadosString);
            setdatoCarrito(datosGuardados);
        }
    
    },[]);

    const configMenu = useRef(null);
    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const deleteSelectedCarrito = (id) => {
        let productAlmacenados = JSON.parse(localStorage.getItem('products'));
        let _datoCarrito = datoCarrito.filter((ele) => {
           if (ele.idProd!=id) return ele;
        });
        
        setdatoCarrito(_datoCarrito);
        setBadgerContador(contadorBadger - 1);
        localStorage.setItem('products', JSON.stringify(_datoCarrito));
    }

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <span className='pi pi-shopping-cart'></span>
                    <span className="font-bold">My Purchase</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const restarProd = (id,value,stock) =>{
        let _datoCarrito = [...datoCarrito];
                
        let indexCarrito = _datoCarrito.findIndex((ele) => {
            return ele.idProd == id;
        })

        if (_datoCarrito[indexCarrito].contadorProd > 1){
            _datoCarrito[indexCarrito].contadorProd--;
            setdatoCarrito(_datoCarrito);
        }
    }

    const sumarProd = (id,value,stock) =>{
        let _datoCarrito = [...datoCarrito];
        let productAlmacenados = JSON.parse(localStorage.getItem('products'));
                
        let indexCarrito = _datoCarrito.findIndex((ele) => {
            return ele.idProd == id;
        })

        if(_datoCarrito[indexCarrito].contadorProd + 1 <= _datoCarrito[indexCarrito].stockProd){
            _datoCarrito[indexCarrito].contadorProd++;
            setdatoCarrito(_datoCarrito);
            localStorage.setItem('products', JSON.stringify(_datoCarrito));
        }
        else{
            msj(stock);
        }
    }
    

    const footerTemplate = (book) => {
       const classButtonDisabled = "p-button-primary p-disabled";
       const classButtonEnabled = "p-button-primary";

        return (
            <div className="flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="flex align-items-center gap-2">     
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button icon="pi pi-minus" rounded text onClick={() => restarProd(book.idProd,book.contadorProd,book.stockProd)}
                        className={(book.contadorProd == 1) ? classButtonDisabled : classButtonEnabled}/>
						<span className='px-3'>{book.contadorProd}</span>
                        <Button icon="pi pi-plus" rounded text onClick={() => sumarProd(book.idProd,book.contadorProd,book.stockProd)}/>
                    </div>
                </div>
                <Button icon="pi pi-trash" severity="secondary" rounded outlined text onClick={() => deleteSelectedCarrito(book.idProd)}></Button>
                 
            </div>
        );
    };

    return(
        <>
            <Toast ref={toast} />
            <Panel headerTemplate={headerTemplate}  toggleable>
                {
                    (datoCarrito.length > 0) ?
                    (datoCarrito.map((book, index) => (  
                        <Card key={index} footer = {footerTemplate(book)} className='my-3' 
                            pt={{
                                body: { className: 'px-1 py-1' },
                                content: { className: 'py-0' },
                                footer: { className: 'pt-0' },
                            }}>
                            <div className='grid nested-grid'>
                                <div class="col-4 flex align-items-center" style={{maxWidth:"96px", maxHeight:"100px"}}>
                                        {book.imagenProd ? (<img  className="w-full" src={require('../../images/' + book.imagenProd + '.png')}/>) : null}
                                </div>   
                                <div class="col-8">
                                    <div class="grid">
                                        <div class="col-12 pb-0">
                                            <p  class="lg:text-base md:text-sm sm:text-xs text-left mb-0" style={{fontWeight: 'bold' }}>{book.titleProd ? book.titleProd : "Carrito vacío"}</p>
                                        </div>
                                        <div class="col-12">
                                            <p  class="lg:text-base md:text-sm sm:text-xs text-left mb-0" style={{ color: 'red', fontWeight: 'bold' }}>{book.priceProd ? "$" + book.priceProd : ""}</p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </Card>
                           
                    )))
                        :
                        (<Card title="Carrito vacío">
                            <p className='m-0'>
                                 There are no books in the cart.
                            </p>
                        </Card>                        
                        )
                }
            
            </Panel>

        </>
    )
}