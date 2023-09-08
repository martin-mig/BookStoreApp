import React from 'react'
import { FileTable } from './FileTable';
import { useState } from "react";

export const Libros = () => {
    
    const [getResultSearch, setResultSearch] = useState([]);

    const handleSearchClick = async (e) => {
      
       const peticion = await fetch("http://localhost:3001/search-books"); 
       const data = await peticion.json();
       // console.log(data);
       setResultSearch(data)
    }
   
    return(
        <>
            <div className="row g-3">
                <div className="col-md-12">
                    <div className="panel panel-info">
                        <div className="panel-heading"><strong>Filters</strong></div>
                        <div style={{ display: 'flex' }} >
                            <div className="panel-body" style={{ width: '87%' }}> 
                                <div className="row g-3 text-left">
                                    <div className="col-md-4">
                                        <div className="checkbox">
                                        
                                            <label className="custom-label"><input type="checkbox" value=""></input><strong>Title</strong></label>
                                            <input type="text"></input>
                                            
                                        </div>
                                    </div>   
                                    <div className="col-md-4">
                                        <div className="checkbox">
                                            <label className="custom-label"><input type="checkbox" value=""></input><strong>Author</strong></label>
                                            <input  type="text"></input>
                                        </div>
                                    </div>     

                                    <div className="col-md-4">
                                        <div className="checkbox">
                                            <label className="custom-label"><input type="checkbox" value=""></input><strong>Category</strong></label>
                                            <input type="text"></input>
                                        </div>
                                    </div> 
                                    
                                </div>

                                <div className="row g-3 text-left">
                                    <div className="col-md-4">
                                        <div className="checkbox">
                                            <label><input type="checkbox" value=""></input><strong>ISBN</strong></label>
                                            <input  type="text"></input>
                                        </div>
                                    </div>    

                                    <div className="col-md-4">
                                        <div className="checkbox">
                                            <label><input type="checkbox" value=""></input><strong>Publishing</strong></label>
                                            <input type="text"></input>
                                        </div>
                                    </div>  

                                    <div className="col-md-4">
                                        <div className="checkbox">
                                            <label><input type="checkbox" value=""></input><strong>Status</strong></label>
                                            <input  type="text"></input>
                                        </div>
                                    </div>  
                                </div>

                            </div>

                            <div className="panel-body" style={{ width: '10%' }}>
                            
                                <button type="button" style={{ marginTop: '10px' }}  onClick={handleSearchClick}>  
                                    <img src={require('../images/search2.png')}  alt="search"></img>
                                        &nbsp;<strong> Buscar</strong>  
                                </button>
                                    
                            </div>
                        </div>
                    </div>

                    <div>  
                        <FileTable  data = {getResultSearch}/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}