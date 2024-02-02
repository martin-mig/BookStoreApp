import {React} from 'react'
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { InputText } from "primereact/inputtext";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export const Factura = ({envio,formadepago,carritop,sumatotal}) =>{
   
    const fechaHoy = new Date().toLocaleDateString('en-US');

    const headerTemplate = (options) =>{
        const className = `${options.className} justify-content-space-between`;
        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <img src={require('../../images/book.png')} style={{float:'left', marginLeft: '10px'}}></img>
                </div>
                <div style={{fontFamily: 'Calibri, sans-serif',fontWeight: 'bold'}}>
                    <p>Web: www.bookstore.com</p>
                    <p>Email: bookstore@gmail.com</p>
                    <p>Tel: +5491142448580 </p>
                </div>
                <div style={{fontFamily: 'Calibri, sans-serif',fontWeight: 'bold',marginLeft:'10px'}}>
                    <p>Bank data</p>
                    <p>Account holder</p>
                    <p>CBU</p>
                </div>
            </div>
        );
    }

    const footerTemplate = (options) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2 pl-1 font-bold" >
                  <span>Total: $  {sumatotal}</span>
                </div>
                
            </div>
        );
    };
 
    return(
        
        <div className='px-3 py-3'>
        {
            (carritop.length > 0) ? 
            (
                <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} style={{marginTop: '40px'}}>
                    <p>
                        <div className="grid">
                            <div className="col-12">
                                <h1 style={{fontFamily: 'Calibri, sans-serif',fontWeight: 'bold',color: 'blue', fontSize: '30px',float:'left'}}>Invoice</h1>
                            </div>
                            <div className="col-4">
                                <i className="pi pi-user px-2" style={{fontSize: '1.5rem'}}></i>
                                <InputText type="text" className="p-inputtext-sm px-2" placeholder="Customer" />
                            </div>
                            <div className="col-4">
                                <i className="pi pi-calendar px-2"  style={{fontSize: '1.5rem'}}></i>
                                <InputText type="text" value={fechaHoy} disabled  className="p-inputtext-sm px-2" placeholder="" />
                            </div>
                            <div className="col-4">
                                <i className="pi pi-car px-2" style={{fontSize: '1.5rem'}}></i>
                                <InputText type="text" value={envio} className="p-inputtext-sm px-2" placeholder="" />
                            </div>
                            <div className="col-4">
                                <i className="pi pi-credit-card px-2" style={{fontSize: '1.5rem'}}></i>
                                <InputText type="text" value={formadepago} className="p-inputtext-sm px-2" placeholder="" />
                            </div>
                            <div className="col-4">
                                <i className="pi pi-tag px-2" style={{fontSize: '1.5rem'}}></i>
                                <InputText type="text" value="No" disabled className="p-inputtext-sm px-2" placeholder="" />
                            </div>
                        </div> 
                        <DataTable value={carritop} showGridlines tableStyle={{ minWidth: '50rem',marginTop:'40px' }}>
                            <Column body={(rowData, props) => props.rowIndex + 1} header="Item"></Column>
                            <Column field="titleProd" header="Description"></Column>
                            <Column field="contadorProd" header="Amount"></Column>
                            <Column field="priceProd" header="Price"></Column>
                        </DataTable>
                    </p>
                </Panel>
            ) :
            (
                <Card className='mt-6'>
                    <p className='m-0 font-bold text-5xl'>
                        The cart is empty.
                    </p>
                </Card>
            )
        }
        </div>
        
    )
    
}