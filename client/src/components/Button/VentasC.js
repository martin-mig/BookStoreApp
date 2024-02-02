import React , { useState, useEffect, useId, useRef } from 'react'
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { useAjax } from '../../hooks/useAjax';
import { Carrito } from './Carrito';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

export const VentasC = () => {
    const [ajaxUrl, SetAjaxUrl] = useState(process.env.REACT_APP_API + "/search-books");
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
   
    const [filtro, setFiltro] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState([]);

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

    useEffect(() => {
        if (!(localStorage.getItem('products') === null)) {
            setContador(JSON.parse(localStorage.getItem('products')).length);
        }   
    },[]);
 
    useEffect(() => {
        // Lógica para filtrar productos cuando cambia el filtro.
        let regex = new RegExp(`^${filtro}`, 'i');
        let approved = products.filter(product => regex.test(product.title));
      //  console.log("ES EL APPROVED " , approved);
        setProductosFiltrados(approved);
    }, [filtro, products]); 

    const toast = useRef(null);

    const navigate = useNavigate();

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
    const finalizarCompra = (sumaPrecio,carritoP) => {
        navigate('/consultas/finalizar-compra', { state: { sumaPrecio,carritoP} });
    } 

    //const filtrarProd = (e) =>{
       /* let filtro = e.target.value;
        let regex = new RegExp(`^${filtro}`, 'i');
        console.log("valor del filtro", e.target.value);

       
        let approved = products.filter(product => regex.test(product.title));

        getProducts(approved);
        console.log("soon los parecidos " , approved);
        */
      //  setFiltro(e.target.value);
   // }

    const headerT = (options) => {
        const className = `${options.className} justify-content-space-between`;
        return (
            <div className={className} >
                <div className="flex align-items-center gap-2">
                        <Dropdown options={sortOptions} value={sortKey}   optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="flex justify-start w-full sm:w-14rem" />             
                    <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                        <InputText type="search"  onChange={(e) => setFiltro(e.target.value)}  placeholder="Search Title..." />
                    </span>
                </div>
                <div className="grid">
                    <div className="col">
                        <div className="text-center pb-3 pt-3">
                        <strong>{(sumaPrecio != 0) ? ('Total: $' + sumaPrecio) : ''}</strong>
                        </div>
                    </div>
                    <div className="col-fixed" style={{width:"100px"}}>
                        <div className="text-center">
                            <Button  className='mr-8' type="button" rounded text severity="success" onClick={()=>finalizarCompra(sumaPrecio,carritoP)} outlined icon="pi pi-cart-plus" size="large">
                                <Badge value={contador} severity="danger" ></Badge>
                            </Button>   
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const showSticky = (stock) => {
        toast.current.show({ severity: 'info', summary: 'Warning', detail: 'You cannot purchase more than the current stock of the product that is equal to '+ stock , sticky: true });
    };

    const btnCarrito = (item) =>{
    console.log("El stock que tengo " ,item.stock);    

    let _carritoP = [...carritoP];
    let indexCarrito = _carritoP.findIndex((ele) => {
        return (ele.idProd == item._id);
    })

      if (indexCarrito != -1)//si ya existe
      {
        if(item.stock >= _carritoP[indexCarrito].contadorProd + 1){
            _carritoP[indexCarrito].contadorProd++;
            setCarritoP(_carritoP);
        }
        else{
            showSticky(item.stock);
        }
      }
      else{ //carrito nuevo
        let carritoProd = {
            idProd: item._id,
            titleProd: item.title,
            priceProd: item.price,
            imagenProd: item.categories,
            stockProd: item.stock,
            contadorProd: 1,
        }

        if (item.stock > 0){
            setCarritoP([...carritoP, carritoProd]);
            setContador(contador + 1);
            guardarEnStorage(carritoProd);
        }
        else{
            showSticky(item.stock);
        }
      }
    }

    const guardarEnStorage = producto =>{
        let elementos = JSON.parse(localStorage.getItem("products"));
       
       if(Array.isArray(elementos)){
            elementos.push(producto);
       }else{
            elementos = [producto];
       }
       localStorage.setItem("products" , JSON.stringify(elementos));
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
                                <Button icon="pi pi-shopping-cart" className="p-button-rounded"  onClick={()=> btnCarrito(product)} ></Button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
    return (
        <div>
            <Toast ref={toast} />
            <Panel headerTemplate={headerT}>
                <div className='grid'>
                    <div className="col-9" >
                        <DataView value={productosFiltrados} itemTemplate={itemTemplate} paginator rows={3} sortField={sortField} sortOrder={sortOrder}/>
                    </div>
                    <div className="col-3" style={{ marginTop: '30px' }}>
                        <Carrito datoCarrito={carritoP} setdatoCarrito={setCarritoP} contadorBadger={contador} setBadgerContador={setContador} msj={showSticky}/>
                    </div>
                </div>
            </Panel>
        </div>
    )
}