import React from 'react';
import './App.css';
import { useState } from "react";
import { TabPaneNB } from './components/TabPaneNB';
import { FileTable } from './components/FileTable';

function App() {

    const [getResultSearch, setResultSearch] = useState([]);

    const handleSearchClick = async (e) => {
      
       const peticion = await fetch("http://localhost:3001/search-books"); 
       const data = await peticion.json();
       // console.log(data);
       setResultSearch(data)
    }

  
    return (
        <div className="layout">
            <header className="header">  
            <div style={{ marginLeft: '10px' }}>    
                <img src={require('./images/book.png')} className='libroimg' alt='logoboook' />
                <h1 className="titulo">Book Store</h1>
            </div>
            </header> 
            
            <div className="panelnav with-nav-tabs panel-primary">
                <div className="panel-heading">
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#consultas">Consultas</a></li>
                        <li ><a data-toggle="tab" href="#stock">Stock</a></li>
                        <li><a data-toggle="tab" href="#tab2primary">Venta</a></li>
                        <li><a data-toggle="tab" href="#tab3primary">Clientes</a></li>
                        <li><a data-toggle="tab" href="#tab4primary">Usuarios</a></li>
                        <li><a data-toggle="tab" href="#tab5primary">Sistema</a></li>
                    </ul>
                </div> 
                <div className="panel-body">
                    <div className="tab-content">
                        <TabPaneNB tab_id="consultas"/>
                        {/*Tengo que ubicar los siguientes div en el componente tabpane */}
                        <div className="tab-pane fade" id="stock">Primary 1</div>
                        <div className="tab-pane fade" id="tab2primary">Primary 2</div>
                        <div className="tab-pane fade" id="tab3primary">Primary 3</div>
                    </div>
                </div>   
            </div>  

            {/*Contenido principal*/}
            <section className="content">
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
                                                <label><input type="checkbox" value=""></input><strong>Publication date</strong></label>
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
                                                <label><input type="checkbox" value=""></input><strong>Country</strong></label>
                                                <input  type="text"></input>
                                            </div>
                                        </div>  
                                    </div>

                                </div>

                                <div className="panel-body" style={{ width: '10%' }}>
                                
                                    <button type="button" style={{ marginTop: '10px' }}  onClick={handleSearchClick}>  
                                        <img src={require('./images/search2.png')}  alt="search"></img>
                                            &nbsp;<strong> Buscar</strong>  
                                    </button>
                                        
                                </div>
                            </div>
                        </div>

                        <div id="table_search" className="dataTables_wrapper my-custom-wrapper">
                            <div className='dataTables_length'>
                                <label>Show&nbsp;
                                    <select name="example_length" aria-controls="example">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> 
                                    &nbsp;entries
                                </label>
                            </div>
                            <div id="myTable_filter" className="dataTables_filter">
                                <label>
                                    Search:
                                    <input type="search" className="" placeholder="" aria-controls="myTable"></input>
                                </label>
                            </div>  
                            <table id="mytable_search" className="display dataTable"   style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th className="details-control"></th>
                                        <th>Title</th>
                                        <th>ISBN</th>
                                        <th>Published Date</th>
                                        <th>Page Count</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {/*Puedo hacer un componente para cada celda de la tabla tr */}
                                    <FileTable  data = {getResultSearch}/>
                                   
                                   
                                   {/* <tr>
                                        <td className="details-control"><img src={require('./images/add1.png')} alt="Agregar" /></td>
                                        <td  className="sorting sorting_asc">El señor de los anillos (Trilogía)</td>
                                        <td>J. R. R. Tolkien</td>
                                        <td>Aventura Fantastica</td>
                                        <td>2001</td>    
                                        <td>Minotauro</td>   
                                    </tr>
                                    <tr>
                                        <td className="details-control"><img src={require('./images/add1.png')} alt="Agregar" /></td>
                                        <td  className="sorting sorting_asc">Un mundo feliz</td>
                                        <td>Aldous Huxley</td>
                                        <td>Ciencia Ficción</td>
                                        <td>1932</td>    
                                        <td>Zig-Zag</td>   
                                    </tr>
                                    */}
                                </tbody>
                            </table>  
                        </div>
                    </div>
                </div>
            </section>
        
                {/*Pie de pagina*/}
            <footer className="footer">
                &copy; Boherdi Electronica SRL
            </footer>
        </div>
  );
}

export default App;
