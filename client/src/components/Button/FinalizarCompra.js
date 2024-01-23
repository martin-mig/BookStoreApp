import {React, useState} from 'react'
import { Panel } from 'primereact/panel';
import { useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";
import { Factura } from './Factura';
import { MultiSelect } from 'primereact/multiselect';

export const FinalizarCompra = () => {
    const { state } = useLocation();
    console.log("recibo el state " , state);

    const [ingredient, setIngredient] = useState('');

    const [loading, setLoading] = useState(false);

    const [mostrarFactura, setMostrarFactura] = useState(false); 

    /*const groupedPagos = [
        {
            label: 'Tarjeta',
            code: 'DE',
            items: [
                { label: 'Visa', value: 'Visa' },
                { label: 'Master Card', value: 'Master Card' },
                { label: 'American Express', value: 'American Express' }
         
            ]
        },
        {
            label: 'Efectivo',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        }
    ];
*/
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const cargarFactura = () => {
        setMostrarFactura(true); 
    }

    return(
        <div style={{ marginTop:'50px'}} >
            <div class="grid">
                <div class="col-12">
                    <div class="grid">
                        <div class="col">
                            <p className="m-1">
                                <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign:'left', marginLeft: '20px' }}>Total de la compra: $ {state.sumaPrecio} 
                                </p>
                            </p>
                        </div>
                        <div class="col">
                            <div className="flex flex-wrap gap-3">
                                <div className="flex align-items-center">
                                    <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                                    <label htmlFor="ingredient1" className="ml-2">Envio a Domicilio</label>
                                </div>
                                <span className="ml-2">
                                     <i className="pi pi-car" style={{ fontSize: '1.5rem' }}></i> {/* Agrega el icono del carrito de compras aquí */}
                                </span>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'}  />
                                    <label htmlFor="ingredient2" className="ml-2">Retiro en el Local</label>
                                </div>
                                <span className="ml-2">
                                     <i className="pi pi-home" style={{ fontSize: '1.5rem' }}></i> {/* Agrega el icono del carrito de compras aquí */}
                                </span>
                            </div>
                            {/*<MultiSelect value={selectedCities} options={groupedCities} onChange={(e) => setSelectedCities(e.value)} optionLabel="label" 
                            optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate}
                            placeholder="Select Cities" display="chip" className="w-full md:w-20rem" />*/   }
                        </div>

                        <div class="col">
                            <Button label="Pagar" icon="pi pi-check" loading={loading} onClick={cargarFactura} />
                        </div>
                    </div>

                </div>
                <div class="col-12">
                    {mostrarFactura && <Factura />}
                </div>
                
            </div>
        </div>
    )
}