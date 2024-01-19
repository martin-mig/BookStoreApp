import React, { useEffect, useId, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';


export const Carrito = ({datoCarrito, setdatoCarrito}) =>{

    console.log("contador carrito",datoCarrito.contadorProd);
    /*console.log(datoCarrito.titleProd);
    console.log(props.datoCarrito.priceProd);
    console.log(props.datoCarrito.imagenProd);
*/
    //console.log(props.datoCarrito[0].titleProd);
    const [titulo, setTitulo] = useState("");
    const [price, setPrice] = useState("");
    const [imagen, setImagen] = useState("");
   // const [contador, setContador] = useState(1);
    
    const idCarrito = useId();
    // useEffect(() => {

    //     // setTitulo(props.datoCarrito.titleProd);
    //     // setPrice(props.datoCarrito.priceProd);
    //     // setImagen(props.datoCarrito.imagenProd)
    //     if (datoCarrito.length > 1){
    //         datoCarrito.unshift();
    //     }

    // },[datoCarrito]);
    

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

    const deleteSelectedCarrito = (key) => {
        //console.log("target", e)
        let _datoCarrito = datoCarrito.filter((ele, index) => {
           if (index!=key.index) return ele;
        });
        
        setdatoCarrito(_datoCarrito);
    }

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <span className='pi pi-shopping-cart'></span>
                    <span className="font-bold">Mi compra</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const changeContadorProd = (key, value) => {
        let _datoCarrito = [...datoCarrito];
        console.log("datoCarrito local ", _datoCarrito[0]);

        
        _datoCarrito[key.index].contadorProd = value;

        setdatoCarrito(_datoCarrito);
    }
    
    const footerTemplate = (key, book) => {
        console.log("llega al book", book);

        return (
            <div className="flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="flex align-items-center gap-2">     
                    <InputNumber min={1} value={book.contadorProd} showButtons buttonLayout="horizontal" size="1"
                        decrementButtonClassName="p-button-primary" incrementButtonClassName="p-button-primary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  inputStyle={{ textAlign: "center" }} 
                        onValueChange={(e) => changeContadorProd(key, e.value)}   />
                </div>
                <Button icon="pi pi-trash" severity="secondary" rounded outlined text onClick={() => deleteSelectedCarrito(key)}></Button>
                 
            </div>
        );
    };

    return(
        <>
            <Panel headerTemplate={headerTemplate}  toggleable>
                {
                    (datoCarrito.length > 0) ?
                    (datoCarrito.map((book, index) => (  
                        <Card key={index} footer = {footerTemplate({index},book)}  >
                            <div className='grid nested-grid'>
                                <div class="col-4 flex align-items-center">
                                        {book.imagenProd ? (<img  className="w-full" src={require('../../images/' + book.imagenProd + '.png')} style={{display: "flex", objectFit:"contain"}}/>) : null}
                                </div>   
                                <div class="col-8">
                                    <div class="grid">
                                        <div class="col-12">
                                            <p  class="text-left" style={{fontWeight: 'bold' }}>{book.titleProd ? book.titleProd : "Carrito vacío"}</p>
                                        </div>
                                        <div class="col-12">
                                            <p  class="text-left" style={{ color: 'red', fontWeight: 'bold' }}>{book.priceProd ? "$" + book.priceProd : ""}</p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </Card>
                            //setCards(nuevaCard)
                    )))
                        :
                        (<Card title="Carrito vacío">
                            <p className='m-0'>
                                 No hay ningún libro en el carrito.
                            </p>
                        </Card>                        
                        )
                }
            
            </Panel>

        </>
    )
}