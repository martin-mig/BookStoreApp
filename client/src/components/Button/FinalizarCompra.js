import {React, useState} from 'react'
import { Panel } from 'primereact/panel';
import { useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";
import { Factura } from './Factura';
import { Dropdown } from 'primereact/dropdown';

export const FinalizarCompra = () => {
    const { state } = useLocation();
    console.log("recibo el state1 " , state);
    console.log("recibo el state2 " , state.carritoP);

    const [envio, setEnvio] = useState('');

   // const [loading, setLoading] = useState(false);

    const [mostrarFactura, setMostrarFactura] = useState(false); 

    const [selectedPay, setSelectedPay] = useState(null);

    const groupedPay = [
        {
            label: 'Tarjeta',
            items: [
                { label: 'Visa', value: 'Visa' },
                { label: 'Master Card', value: 'Master Card' },
                { label: 'American Express', value: 'American Express' }
            ]
        },
        {
            label: 'Efectivo',
            items: [
                { label: 'Efectivo', value: 'Efectivo' }
            ]
        }
    ];

    const groupedItemTemplate = (option) => {
       // console.log("es la option " , option)
       let classTarjeta = "pi pi-credit-card";
       let classEfectivo = "pi pi-money-bill";
        return (
            <div className="flex align-items-center justify-content-start">
                <i className = {(option.label == 'Tarjeta') ? classTarjeta : classEfectivo} style={{fontSize: "1.5rem"}}></i>
                <div className="px-2">
                    {option.label}
                </div>
            </div>
        );
    };

    const cargarFactura = () => {
        setMostrarFactura(true); 
    }

    return(
        <div style={{ marginTop:'50px'}} >
            <div className="flex justify-content-between flex-wrap" style={{paddingLeft:'5px'}}>        
                <div className="flex justify-content-center align-items-center">
                    <div className="flex px-3 align-items-center">
                        <RadioButton inputId="envio1" value="EnvioDomicilio" onChange={(e) => setEnvio(e.value)} checked={envio === 'EnvioDomicilio'} />
                        <label htmlFor="envio1" className="px-2 mb-0">Envio a Domicilio</label>
                        <span className="ml-2">
                            <i className="pi pi-car" style={{ fontSize: '1.5rem' }}></i> {/* Agrega el icono del carrito de compras aquí */}
                        </span>
                    </div>
                    <div className="flex px-3 align-items-center">
                        <RadioButton inputId="envio2" value="RetiroLocal" onChange={(e) => setEnvio(e.value)} checked={envio === 'RetiroLocal'}  />
                        <label htmlFor="envio2" className="px-2 mb-0">Retiro en el Local</label>
                        <span className="ml-2">
                            <i className="pi pi-home" style={{ fontSize: '1.5rem' }}></i> {/* Agrega el icono del carrito de compras aquí */}
                        </span>
                    </div>                  
                    <div class="flex pr-5"> 
                        <Dropdown value={selectedPay} onChange={(e) => setSelectedPay(e.value)} options={groupedPay} optionLabel="label" 
                        optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} className="w-full md:w-14rem text-left" placeholder="Forma de Pago" 
                        pt={{
                            item: {className:'text-left'}
                        }}/> 
                    </div>
                </div>

                <div class="flex px-3 justify-content-center align-items-center">
                    <Button icon="pi pi-file" label="Generar Factura" raised severity="info" onClick={cargarFactura} />
                </div>
            </div>
            {mostrarFactura && <Factura envio={envio} formadepago={selectedPay} carritop= {state.carritoP} sumatotal= {state.sumaPrecio}/>}
         
        </div>
    )
}