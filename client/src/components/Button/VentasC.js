import React , { useState, useEffect } from 'react'
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { useAjax } from '../../hooks/useAjax';
import { Carrito } from './Carrito';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';

export const VentasC = () => {
   console.log("llega a ventas")
    const [ajaxUrl, SetAjaxUrl] = useState("http://localhost:3001/search-books");
    const { databook , loading, error, postData, putData, deleteData } = useAjax(ajaxUrl);

    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    const [carritoP, setCarritoP] = useState([]);
    const [contador, setContador] = useState(0);
    const [sumaPrecio, setSumaPrecio] = useState(0);

    const getProducts = async() =>{
        const response = await postData({});
        setProducts(response);
    }

    useEffect( () => {
        getProducts();
    }, []);

    useEffect( () =>{
        sumaTotal();
    },[carritoP])
 
    const stockConvert = (value) => {
        let stockObj = {};
        if (value >= 50){
            stockObj.valueStr = "IN STOCK";
            stockObj.severity = "success";
        }
        else if(value > 1){
            stockObj.valueStr = "LOW STOCK";
            stockObj.severity = "warning";
        }
        else{
            stockObj.valueStr = "OUT OF STOCK";
            stockObj.severity = "danger"
        }
        return stockObj; 
    }

    const stockBodyTemplate = (data) => {
        let {valueStr, severity} = stockConvert(data.stock);
        return <Tag value={valueStr} severity={severity}></Tag>;
    }

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
     
    const headerT = (options) => {
        const className = `${options.className} justify-content-space-between`;
        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="flex justify-start w-full sm:w-14rem" />
                {/* <Button rounded text severity="success" aria-label="Search" icon="pi pi-shopping-cart"></Button>*/}
                </div>
                <div className="grid">
                    <div class="col">
                        <div class="text-center pb-3 pt-3">
                        <strong>{(sumaPrecio != 0) ? ('Total: $' + sumaPrecio) : ''}</strong>
                        </div>
                    </div>
                    <div class="col-fixed" style={{width:"100px"}}>
                        <div class="text-center">
                            <Button className='mr-8' type="button" rounded text severity="success"  outlined icon="pi pi-cart-plus" size="large">
                                <Badge value={contador} severity="danger" ></Badge>
                            </Button>   
                        </div>
                    </div>
                </div>
            </div>
        )
    };


    const btnCarrito = (title, price, imagen) =>{
        console.log("boton carrito titulo", title);
        console.log("boton carrito precio", price);

        let carritoProd = {
            titleProd: title,
            priceProd: price,
            imagenProd: imagen,
            contadorProd: 1,
        }
       
       setCarritoP([...carritoP, carritoProd]);
       setContador(contador + 1);
       //sumaTotal();
    }

    const sumaTotal = () => {
        let _carritoP = [...carritoP];

        let suma = 0; 
        _carritoP.map((carr, index) => {
            suma += carr.contadorProd * carr.priceProd;
        })
        
        setSumaPrecio(suma);
    }

    <h1>Pagina de Consulta de ventas</h1> 
    const itemTemplate = (product) => {
        return(
            <>    
                <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"  src={require('../../images/' + product.categories + '.png')} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.title}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.categories}</span>
                                    </span>
                                    {stockBodyTemplate(product)}
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={()=>btnCarrito(product.title,product.price, product.categories)} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return (
        <Panel headerTemplate={headerT} >
            <div className='grid'>
                <div className="col-9" >
                    <DataView value={products} itemTemplate={itemTemplate} paginator rows={3} sortField={sortField} sortOrder={sortOrder}/>
                </div>
                <div className="col-3" style={{ marginTop: '30px' }}>
                    <Carrito datoCarrito={carritoP} setdatoCarrito={setCarritoP}/>
                </div>
            </div>
        </Panel>
    )
}