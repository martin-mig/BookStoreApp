import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export const UsuariosC = () => {
    return(
        <> 
            <div className="container">
                <img src={require('../../images/website.jpg')} style={{marginTop:'70px'}} ></img>
            </div>    
        </>
    )
}