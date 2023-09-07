import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';


export const FileTable = ( data ) => {
    
    const initialData = data.data; // Reemplaza 'data.data' con tus datos reales
   
    const [books, setBooks] = useState(initialData);
    const [expandedRows, setExpandedRows] = useState(null);
    

    useEffect(() => {
        setBooks(initialData);
    }); 


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
                        <strong>Authors :</strong>  {data.authors.join(', ')}
                    </li>
                    <li>
                        <strong>Categories :</strong>  {data.categories.join(', ')}
                    </li>
                </ul>    
            </div>
        );
    };

    const ratingBodyTemplate = (data) => {
        return <Rating value={data.rating} readOnly cancel={false} />;
    };

    const customDateRenderer = (rowData) => {
        const fullDate = rowData.publishedDate; // Obtiene la fecha completa
        const parts = fullDate.split('T'); // Divide la fecha y la hora
      
        if (parts.length > 0) {
          const date = parts[0]; // Obtiene la parte de la fecha
          return <span>{date}</span>;
        }
      
        return null;
      };

    return (
        <div className="card">
            <DataTable value={books} selectionMode="single" showGridlines paginator rows={5} scrollable scrollHeight="400px" rowsPerPageOptions={[5, 10, 25, 50]}
                expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
            >
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="title" header="Title" sortable filter filterPlaceholder="Search" style={{ width: '35rem' }}></Column>
                <Column field="publishedDate" header="Published" style={{ width: '15rem' }} body={customDateRenderer}></Column>
                <Column field="isbn" header="ISBN" ></Column>
                <Column field="pageCount" header="Page Count"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
            </DataTable>
        </div>
    );
    
}
        