import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { usePostAjax } from '../hooks/usePostAjax';
import { useDeleteAjax } from '../hooks/useDeleteAjax';

export const FileTable = ( data ) => {
    
    let emptyProduct = {
       _id: null,
       title: '',
       isbn: '',
       pageCount: 0,
       publishedDate: 0,
       shortDescription: '',
       status: '',
       authors: [],
       categories: [],

    };
    const url = 'http://localhost:3001/add-book';
    const urlDelete = 'http://localhost:3001/delete-books';
    const { databook , loading, error, postData } = usePostAjax(url);
    const { deleteData , deleteLoading, deleteError, funcDeleteData } = useDeleteAjax(urlDelete);

    const initialData = data.data; // Reemplaza 'data.data' con tus datos reales
   
    //const [books, setBooks] = useState();
    const [products, setProducts] = useState(initialData);

    const [expandedRows, setExpandedRows] = useState(null);
    const [statuses ] = useState([]);

    const [product, setProduct] = useState(emptyProduct);

    const [productDialog, setProductDialog] = useState(false);

    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setProducts(initialData);
    }, [initialData]); 

    const allowExpansion = () => {
        return true;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div>
                <ul>
                    <li>
                        <strong>Short Description :</strong>  {data.shortDescription}
                    </li>
                    <li>
                        <strong>Page Count :</strong>  {data.pageCount}
                    </li>
                    <li>
                        <strong>Categories :</strong>  {data.categories.join(', ')}
                    </li>
                    <li>
                        <strong>Published :</strong>  {(new Date(data.publishedDate)).toLocaleDateString()}
                    </li>
                    </ul>    
                    </div>
        );
    };

    const authorsBodyTemplate = (data) => {
        return data.authors.join(', ');
    };

    const ratingBodyTemplate = (data) => {
        return <Rating value={data.rating} readOnly cancel={false} />;
    };

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

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    // const statusEditor = (options) => {
    //     return (
    //         <Dropdown
    //             value={options.value}
    //             options={statuses}
    //             onChange={(e) => options.editorCallback(e.value)}
    //             placeholder="Select a Status"
    //             itemTemplate={(option) => {
    //                 return <Tag value={option} severity={getSeverity(option)}></Tag>;
    //             }}
    //         />
    //     );
    // };
 ///////////////////////////////////////Dialog Add///////////////////////////////////////////////////////////////////
 
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onDateChange = (e, name) => {
        const val = e.value;
        //ajustar la fecha al formato que quiere la DB
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const saveProduct = () => {
        console.log("llegaaa al save")
        setSubmitted(true);

        if (product.title.trim()) {
            let _products = [...products];
            let _product = { ...product };
           // console.log("estos son los productos " + products)
            console.log("este es el producto " + JSON.stringify(_product));

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            postData(product);
            setProduct(emptyProduct);
            
            // mandr a la base de datos
        }
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

     const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const deleteSelectedProducts = async () => {
        toast.current.show({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
        let _products = products.filter((val) => !selectedProducts.includes(val));
        
        console.log("productos a borrar: ", _products);
        console.log("productos restantes:", products);
        await funcDeleteData(selectedProducts);
        
        //deletedData es el/los objeto/s borrados
        
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        if(!deleteLoading){
            toast.current.clear();
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        }
        
    };

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable value={products} selectionMode="single" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    showGridlines paginator rows={5} scrollable scrollHeight="400px" rowsPerPageOptions={[5, 10, 25, 50]}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="title" header="Title" sortable filter filterPlaceholder="Search" style={{ width: '30rem' }}></Column>
                    <Column field="isbn" header="ISBN" ></Column>
                    <Column field="authors" header="Authors" body={authorsBodyTemplate} ></Column>
                    <Column field="stock" header="Stock" body={stockBodyTemplate} ></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '42rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Book Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
            {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <InputText id="title" value={product.title} onChange={(e) => onInputChange(e, 'title')} />
                </div>
                <div className="field col">
                    <label htmlFor="isbn" className="font-bold">
                        ISBN
                    </label>
                    <InputText id="isbn" value={product.isbn} onChange={(e) => onInputChange(e, 'isbn')} />
                </div>
                <div className="field col">
                    <label htmlFor="author" className="font-bold">
                        Author
                    </label>
                    <InputText id="author" value={product.author} onChange={(e) => onInputChange(e, 'author')} />
                </div>
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="stock" className="font-bold">
                        Stock
                    </label>
                    <InputNumber id="stock" value={product.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} mode="decimal" />
                </div>
                <div className="field col">
                    <label htmlFor="pages" className="font-bold">
                        Pages
                    </label>
                    <InputNumber id="pages" value={product.pageCount} onValueChange={(e) => onInputNumberChange(e, 'pageCount')} />
                </div>
                <div className="field col">
                    <label labelFor="buttondisplay" class="font-bold block mb-2">
                        Published
                    </label>
                    <Calendar id="buttondisplay" value={product.publishedDate} onChange={(e) => onDateChange(e, 'publishedDate')} showIcon />

                    {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} /> */}
                </div>
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="title" className="font-bold">
                        Category
                    </label>
                    <InputText id="category" value={product.categories} onChange={(e) => onInputChange(e, 'title')} />
                </div>
                <div className="field col">
                   
                </div>
                <div className="field col">
                   
                   </div>
              
            </div>
            <div className="field">
                <label htmlFor="description" className="font-bold">
                    Short Description
                </label>
                <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
            </div>
            {/* <div className="field">
                <label htmlFor="name" className="font-bold">
                    Title
                </label>
                <InputText id="name" value={product.title} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.title })} />
                {submitted && !product.title && <small className="p-error">Title is required.</small>}
            </div> */}
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected books?</span>}
                </div>
            </Dialog>
        </div>
    );
    
}
        