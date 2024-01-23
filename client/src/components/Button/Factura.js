import {React} from 'react'
import { Card } from 'primereact/card';

export const Factura = () =>{

    const nuevoLabel = 'Generar Factura';
    const editarLabel = 'Guardar Cambios';

    const subtotal = "30";
    const rebaja = "40"
    const impuestos = "20";
    const total = "10";
  

    return(
        <>
        <div className="card">
            <Card title="Factura">
                <p className="m-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
        </>
    )
    
}