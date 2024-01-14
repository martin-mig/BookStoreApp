import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export const UsuariosC = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      // Realiza una solicitud HTTP para obtener los datos de MongoDB
      
      axios.get("http://localhost:3001/search-users")
        .then((response) => {
           
          setUsuarios(response.data);
         
        })
        .catch((error) => {
          console.error('Error al obtener datos de MongoDB', error);
        });
    }, []);

    console.log(usuarios)
    const users = [
        {
            id: 1000,
            name: 'James Butt',
            country: {
                name: 'Algeria',
                code: 'dz'
            },
            company: 'Benton, John B Jr',
            department: 'Stock',
            salary: '1500 usd',
            date: '2015-09-13',
            jobstatus:'new',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: {
                name: 'Ioni Bowcher',
                image: 'ionibowcher.png'
            },
            balance: 70663
        },
        {
            id: 1001,
            name: 'Josephine Darakjy',
            country: {
                name: 'Egypt',
                code: 'eg'
            },
            company: 'Chanay, Jeffrey A Esq',
            date: '2015-09-13',
            department: 'Finance',
            salary: '3500 usd',
            jobstatus:'qualified',
            status: 'proposal',
            verified: true,
            activity: 0,
            representative: {
                name: 'Amy Elsner',
                image: 'amyelsner.png'
            },
            balance: 82429
        },
        {
            id: 1002,
            name: 'Art Venere',
            country: {
                name: 'Panama',
                code: 'pa'
            },
            company: 'Chemel, James L Cpa',
            department: 'Finance',
            salary: '3500 usd',
            jobstatus:'qualified',
            date: '2017-05-13',
            status: 'qualified',
            verified: false,
            activity: 63,
            representative: {
                name: 'Asiya Javayant',
                image: 'asiyajavayant.png'
            },
            balance: 28334
        },
        {
            id: 1003,
            name: 'Lenna Paprocki',
            country: {
                name: 'Slovenia',
                code: 'si'
            },
            department: 'Stock',
            salary: '1500 usd',
            jobstatus:'new',
            company: 'Feltz Printing Service',
            date: '2020-09-15',
            status: 'new',
            verified: false,
            activity: 37,
            representative: {
                name: 'Xuxue Feng',
                image: 'xuxuefeng.png'
            },
            balance: 88521
        },
        {
            id: 1004,
            name: 'Donette Foller',
            country: {
                name: 'South Africa',
                code: 'za'
            },
            company: 'Printing Dimensions',
            department: 'Cleaning',
            salary: '1000 usd',
            jobstatus:'qualified',
            date: '2016-05-20',
            status: 'proposal',
            verified: true,
            activity: 33,
            representative: {
                name: 'Asiya Javayant',
                image: 'asiyajavayant.png'
            },
            balance: 93905
        },
        {
            id: 1005,
            name: 'Simona Morasca',
            country: {
                name: 'Egypt',
                code: 'eg'
            },
            company: 'Chapman, Ross E Esq',
            department: 'Cleaning',
            salary: '1000 usd',
            jobstatus:'qualified',
            date: '2018-02-16',
            status: 'qualified',
            verified: false,
            activity: 68,
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            },
            balance: 50041
        },
        {
            id: 1006,
            name: 'Mitsue Tollner',
            country: {
                name: 'Paraguay',
                code: 'py'
            },
            company: 'Morlong Associates',
            department: 'Cleaning',
            salary: '800 usd',
            jobstatus:'qualified',
            date: '2018-02-19',
            status: 'new',
            verified: true,
            activity: 54,
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            },
            balance: 58706
        },
        {
            id: 1007,
            name: 'Leota Dilliard',
            country: {
                name: 'Serbia',
                code: 'rs'
            },
            company: 'Commercial Press',
            department: 'Stock',
            salary: '1800 usd',
            jobstatus:'qualified',
            date: '2019-08-13',
            status: 'renewal',
            verified: true,
            activity: 69,
            representative: {
                name: 'Onyama Limba',
                image: 'onyamalimba.png'
            },
            balance: 26640
        },
       
     // Agrega más objetos de datos aquí si es necesario
    ];

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        const name = rowData.name;
        return (
            <div className="flex align-items-center gap-2">
                <img alt={name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                <span style={{ marginLeft: '10px' }}>{name}</span>
            </div>
        );
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span style={{ marginLeft: '10px' }}>{rowData.country.name}</span>
            </div>
        );
    };


    const dateBodyTemplate = (rowData) => {
        return (rowData.date);
    };

    return(
        <>
            <h1>User consultation page </h1>  
            <div className="container">
                <DataTable value={usuarios} paginator showGridlines rows={10}>
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name"  style={{ minWidth: '14rem' }} body={representativeBodyTemplate} />
                    <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate}/>
                    <Column header="High Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
                    <Column field="department" header="Department" style={{ minWidth: '10rem' }} />
                    <Column field="jobstatus" header="Job Status" style={{ minWidth: '10rem' }} />
                    <Column field="salary" header="Salary" style={{ minWidth: '10rem' }} />
                    
                   
                       
                   {/* <Column header="Agent" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                        body={representativeBodyTemplate} filter filterElement={representativeFilterTemplate} />
                    <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                */}
                </DataTable>
            </div>
        </>
    )
}