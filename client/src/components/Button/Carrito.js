import React, { useEffect, useId, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

export const Carrito = ({datoCarrito, setdatoCarrito, contadorBadger, setBadgerContador}) =>{
    /*console.log(datoCarrito.titleProd);
    console.log(props.datoCarrito.priceProd);
    console.log(props.datoCarrito.imagenProd);
*/
    //console.log(props.datoCarrito[0].titleProd);
    const [titulo, setTitulo] = useState("");
    const [price, setPrice] = useState("");
    const [imagen, setImagen] = useState("");
    
   // const [contador, setContador] = useState(1);
    
    //const idCarrito = useId();
    const toast = useRef(null);
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

    const showSticky = () => {
        toast.current.show({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    };

    const deleteSelectedCarrito = (id) => {
        //console.log("target", e)
        let _datoCarrito = datoCarrito.filter((ele) => {
           if (ele.idProd!=id) return ele;
        });
        
        setdatoCarrito(_datoCarrito);
        setBadgerContador(contadorBadger - 1);
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

    const changeContadorProd = (id, value) => {
        let _datoCarrito = [...datoCarrito];
                
        let indexCarrito = _datoCarrito.findIndex((ele) => {
            return ele.idProd == id;
        })

        console.log("valor de value " , value);
        console.log("valor contadorProd ", _datoCarrito[indexCarrito].contadorProd);
        console.log("valor de stock", _datoCarrito[indexCarrito].stockProd);

        if(_datoCarrito[indexCarrito].stockProd >= _datoCarrito[indexCarrito].contadorProd+1){
            _datoCarrito[indexCarrito].contadorProd = value;
            setdatoCarrito(_datoCarrito);
        }
        else{
            showSticky();
        }
    }
    
    const footerTemplate = (book) => {
       // console.log("llega al book", book);
       const classButtonDisabled = "p-button-primary p-disabled";
       const classButtonEnabled = "p-button-primary";

        return (
            <div className="flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="flex align-items-center gap-2">     
                    <InputNumber min={1} max={book.stockProd} value={book.contadorProd} showButtons buttonLayout="horizontal" size="1"
                        decrementButtonClassName={(book.contadorProd == 1) ? classButtonDisabled : classButtonEnabled} incrementButtonClassName="p-button-primary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  inputStyle={{ textAlign: "center" }} 
                        onValueChange={(e) => changeContadorProd(book.idProd, e.value)}   />
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
                        <Card key={index} footer = {footerTemplate(book)}  >
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