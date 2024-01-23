import React from 'react'
import { FileTable } from '../FileTable';
import { useState } from "react";
import { CheckboxInput } from '../CheckboxInput';

export const Libros = () => {

    const [getResultSearch, setResultSearch] = useState([]);

    const [books, setBooks] = useState({});


    const [inputs, setInputs] = useState({
        title: '',
        author: '',
        stock: '',
        isbn: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const conseguirDatosFormulario = async (e) => {
        e.preventDefault();
        let datos = e.target;
        console.log("Este es el e:", e);


        let books = {
            title: datos.title.value,
            isbn: datos.isbn.value,
           // authors: datos.author.value,
          //  categories: datos.category.value,
           // status: datos.status.value,
           // publishedDate: datos.published.value,
        }

        setBooks(books);

        const peticion = await fetch("http://localhost:3002/search-books", {
            method: "POST", // Usa el método POST para enviar datos al servidor
            headers: {
                "Content-Type": "application/json", // Establece el tipo de contenido a JSON
            },
            body: JSON.stringify(books), // Convierte el objeto 'books' a JSON y envíalo en el cuerpo de la solicitud
        });

        const data = await peticion.json();
        setResultSearch(data)
        // Realiza cualquier manejo de respuesta del servidor necesario
        console.log("Respuesta del servidor:", data);
    }

    return (
        <>
            <div className="row g-3">
                <div className="col-md-12">
                    <div className="panel panel-info">
                        <div className="panel-heading"><strong>Filters</strong></div>
                        <form onSubmit={conseguirDatosFormulario}>
                            <div style={{ display: 'flex' }} >
                                <div className="panel-body" style={{ width: '87%' }}>

                                    <div className="row g-3 text-left">

                                        <CheckboxInput name="title" inputs={inputs} handleInputChange={handleInputChange} />
                                        <CheckboxInput name="author" inputs={inputs} handleInputChange={handleInputChange} />
                                       {/*  <CheckboxInput name="category" inputs={inputs} handleInputChange={handleInputChange} />*/ }

                                    </div>

                                    <div className="row g-3 text-left">
                                        <CheckboxInput name="isbn" inputs={inputs} handleInputChange={handleInputChange} />
                                        <CheckboxInput name="stock" inputs={inputs} handleInputChange={handleInputChange} />
                                       {/* <CheckboxInput name="published" inputs={inputs} handleInputChange={handleInputChange} />*/ }
                                       {/* <CheckboxInput name="status" inputs={inputs} handleInputChange={handleInputChange} />*/ }

                                    </div>

                                </div>

                                <div className="panel-body" style={{ width: '10%' }}>

                                    <button type="submit" style={{ marginTop: '10px' }}>
                                        <img src={require('../../images/search2.png')} alt="search"></img>
                                        &nbsp;<strong> Buscar</strong>
                                    </button>

                                </div>
                            </div>
                        </form>

                    </div>

                    <div>
                        <FileTable data={getResultSearch} />

                    </div>
                </div>
            </div>
        </>
    )
}