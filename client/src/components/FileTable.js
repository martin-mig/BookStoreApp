import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useAjax } from '../hooks/useAjax';
import { Dropdown } from 'primereact/dropdown';

export const FileTable = ( data ) => {
    console.log("llega a book")
    let emptyProduct = {
       _id: null,
       title: '',
       isbn: '',
       pageCount: 0,
       publishedDate: 0,
       shortDescription: '',
       status: '',
       authors: [],
       categories: '' ,
       rating: 0,
       price: 0

    };

    const categoryProduct = [
        "Programming",
        "Novel",
        "Travel",
        "Cook",
        "Education",
        "Health",
        "Terror",
        "Miscellaneous"
    ];

    const [ajaxUrl, SetAjaxUrl] = useState("");
    const { databook , loading, error, postData, putData, deleteData } = useAjax(ajaxUrl);

    const initialData = data.data;
   
    const [products, setProducts] = useState(initialData);

    const [expandedRows, setExpandedRows] = useState(null);

    const [product, setProduct] = useState(emptyProduct);

    const [productDialog, setProductDialog] = useState(false);

    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
  
    const [dialogType, setDialogType] = useState(null);
    const [modifiedProduct, setModifiedProduct] = useState({})

    const [modifyProductDialog, setmodifyProductDialog] = useState(false);

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
                        <strong>Categories :</strong>  {data.categories}
                    </li>
                    <li>
                        <strong>Published :</strong>  {(new Date(data.publishedDate)).toLocaleDateString('en-US')}
                    </li>
                    <li>
                        <strong>Price :</strong>  {data.price}
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
        setDialogType('add');
        SetAjaxUrl('http://localhost:3002/add-book');
    };

    const modifySelected = () =>{
        if (selectedProducts.length > 1){
            setmodifyProductDialog(true);
        }
        else{
            setProductDialog(true); 
            setDialogType('modify');
            setModifiedProduct(selectedProducts[0]);
            SetAjaxUrl('http://localhost:3002/edit-book');
        }
    }

    const hideModifyProductsDialog = () => {
        setmodifyProductDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
        SetAjaxUrl("http://localhost:3002/delete-books");
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                <Button label="Update" icon="pi pi-refresh" severity="info" onClick={modifySelected} disabled={!selectedProducts || !selectedProducts.length}/>
            </div>
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';

        if (dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };
            console.log("name: " + name + "valor: " + val);
            _modifiedProduct[`${name}`] = val;
    
            setModifiedProduct(_modifiedProduct);
        }
        else{
            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
    };

    const onInputArrayChange = (e, name) => {
       
        const val = (e.target && e.target.value) || '';

        if(dialogType === 'modify'){
            let _modifiedProduct = {...modifiedProduct};

            _modifiedProduct[name] = val.split(',');

            setModifiedProduct(_modifiedProduct);
        }
        else{
            let _product = { ...product };

            _product[name] = val.split(',');
        
            setProduct(_product);
        }
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;

        if(dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };

            _modifiedProduct[`${name}`] = val;

            setModifiedProduct(_modifiedProduct);
        }
        else{
            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
    };

    const onDateChange = (e, name) => {
        const val = e.value;
        if(dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };

            _modifiedProduct[`${name}`] = val;
            console.log("valor calendario " , val);

            setModifiedProduct(_modifiedProduct);
        }
        else{
            //ajustar la fecha al formato que quiere la DB
            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
    };

    const saveProduct = (operacion) => {
        setSubmitted(true);

        let _products = [...products];
        let _product = { ...product };
        if (operacion === 'add'){
            console.log("llega al add2")
            _products.push(_product);

            console.log("AjaxURL " + ajaxUrl)
            postData(product);
            setProducts(_products);
        }else
        {
            putData(modifiedProduct);
            //sobreescribo en el array el producto modificado
            setProducts((_products) => _products.map(obj => (obj._id === modifiedProduct._id ? modifiedProduct : obj)));          
        }
        
        setProductDialog(false);
        setProduct(emptyProduct);
        setSelectedProducts(null);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const deleteSelectedProducts = async () => {
        toast.current.show({ severity: 'info', summary: 'Sticky', detail: 'Wait...', sticky: true });
        let _products = products.filter((val) => !selectedProducts.includes(val));

        await deleteData(selectedProducts);
        
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        if(!loading){
            toast.current.clear();
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Erased Book', life: 3000 });
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
            {/*<Button label="Save" icon="pi pi-check" onClick={saveProduct} />*/}
            <Button label="Save" icon="pi pi-check" onClick={() => saveProduct(dialogType)} />

        </React.Fragment>
    );

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Table Books</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    function convertirFormatoFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        return fecha;
    }
 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Toast ref={toast} />
           
            <div className="card">
           
            <Toolbar className="mb-3" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          
                <DataTable ref={dt} value={products} editMode="cell" selectionMode="single" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    showGridlines paginator rows={5} scrollable scrollHeight="400px" rowsPerPageOptions={[5, 10, 25, 50]}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}
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
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="title" className="font-bold">
                            Title
                        </label>
                        <InputText id="title" value = {(dialogType === 'add') ? product.title : modifiedProduct.title}  placeholder='Title' onChange={(e) => onInputChange(e, 'title')} />
                    </div>
                    <div className="field col">
                        <label htmlFor="isbn" className="font-bold">
                            ISBN
                        </label>
                        <InputText id="isbn" value = {(dialogType === 'add') ? product.isbn : modifiedProduct.isbn} placeholder= 'ISBN' onChange={(e) => onInputChange(e, 'isbn')} />
                    </div>
                    <div className="field col">
                        <label htmlFor="author"  className="font-bold">
                            Author
                        </label>
                        <InputText id="author" value = {(dialogType === 'add') ? product.authors : modifiedProduct.authors} placeholder= 'Authors 1, Authors 2' onChange={(e) => onInputArrayChange(e, 'authors')} />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="stock" className="font-bold">
                            Stock
                        </label>
                        <InputNumber id="stock" value = {(dialogType === 'add') ? product.stock : modifiedProduct.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} mode="decimal" />
                    </div>
                    <div className="field col">
                        <label htmlFor="pages" className="font-bold">
                            Pages
                        </label>
                        <InputNumber id="pages" value = {(dialogType === 'add') ? product.pageCount : modifiedProduct.pageCount} onValueChange={(e) => onInputNumberChange(e, 'pageCount')} />
                    </div>
                    <div className="field col">
                        <label labelFor="buttondisplay" class="font-bold block mb-2">
                            Published
                        </label>
                        <Calendar id="buttondisplay" value = {(dialogType === 'add') ? (product.publishedDate) : convertirFormatoFecha(modifiedProduct.publishedDate)} onChange={(e) => onDateChange(e, 'publishedDate')} showIcon />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label labelFor="categories" className="font-bold">
                            Category
                        </label>
                        <Dropdown id="categories" value={(dialogType === 'add') ? (product.categories) : (modifiedProduct.categories)} onChange={(e) => onInputChange(e, 'categories')} options={categoryProduct} 
                        placeholder= "Select a Category" />
                    </div>
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value = {(dialogType === 'add') ? product.price : modifiedProduct.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="decimal" />
                    </div>
                    <div className="field col">
                        <label htmlFor="rating" className="font-bold">
                            Rating
                        </label>
                        <InputNumber id="rating" value = {(dialogType === 'add') ? product.rating : modifiedProduct.rating} onValueChange={(e) => onInputNumberChange(e, 'rating')} mode="decimal" />
                    </div>
                
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Short Description
                    </label>
                    <InputTextarea id="description"  value = {(dialogType === 'add') ? product.shortDescription : modifiedProduct.shortDescription} placeholder= "Short Description" onChange={(e) => onInputChange(e, 'shortDescription')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={modifyProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Error" modal onHide={hideModifyProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                           You can not edit more than one product at a time. 
                        </span>
                    )}
                </div>
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
        