import reat, { useState } from 'react'
import { Dialog } from 'primereact/dialog';

export const DialogModify = () =>{
    const [modifyProductDialog, setmodifyProductDialog] = useState(false);
    
    return(
        <>
            <Dialog visible={modifyProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Error" modal footer={modifyProductsDialogFooter} onHide={hideModifyProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                           You can not edit more than one product at a time. 
                        </span>
                    )}
                </div>
            </Dialog>
        </>
    )
}