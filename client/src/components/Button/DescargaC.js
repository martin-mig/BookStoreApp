import React from 'react'
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


export const DescargaC = () => {
  const [inputValue, setInputValue] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleDescargas = async (e) => {
    setIsLoading(true); // Mostrar spinner al inicio de la carga
    console.log("llega al click de descagaddd");
    console.log(inputValue)
    const urlsend = `http://localhost:3001/dowload-books?inputValue=${encodeURIComponent(inputValue)}`;
    console.log("url send " + urlsend)
    const response = await fetch(urlsend, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const pdfBlob = await response.blob();

    // Crea una URL de objeto (blob) para el PDF y actualiza el estado
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);

    console.log("es el pdf blog " + pdfBlob);

    setIsLoading(false);
  
  }

  return (
    <>
      
    <div className="input-bar">
        <div className="input-bar-item width100">
            <div>
                <input className="form-control width100" type="text" value={inputValue} onChange={handleInputChange} id="named" name="Name"/>
            </div>
        </div>
        <div className="input-bar-item">
          <button className="btn btn-info" onClick={handleDescargas}>Buscar</button>
        </div>
    </div>
      {isLoading && <SpinnerComponent />}
      {pdfUrl && (
        <div>
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="500px"
          >
            <p>El navegador no puede mostrar el PDF. Puedes descargarlo <a href={pdfUrl}>aquí</a>.</p>
          </object>
        </div>
      )}
    </>
  )
}

const SpinnerComponent = () => (
  <div className="spinner-container margin-top:10px">
    <p className="loading-text"><strong>Cargando...</strong></p>
  <div className="loader"></div>
</div>
  
);