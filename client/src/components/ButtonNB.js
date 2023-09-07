import React from 'react';
import { CheckboxInput } from './CheckboxInput';
import { useState } from "react";
import { PanelBody } from './PanelBody';

export const ButtonNB = (props) => {

  /*  const itemConfig = {
        Books: {
            title: '',
            author: '',
            category: '',
            isbn: '',
            status: '',
            published: '',
        },
        Users: {
            type: '',
            name: '',
            apellido: '',
            direccion: '',
        },
        Stock: {
          type: '',
          
        },
      };
  
    const [selectedItem, setSelectedItem] = useState(null);

    const cambiarbody = (nombre) => {
        const itemDetails = itemConfig[nombre];
          if (itemDetails) {
            setSelectedItem(itemDetails);
            console.log("ITEM " + JSON.stringify(itemDetails))
          } else {
            //console.log("llega al nulo");
            setSelectedItem(null); // Manejar tipos no válidos aquí
          }
          console.log("Lega antes del return")
          return <PanelBody selectedItem={selectedItem}></PanelBody>
    };
*/
    const handleClick = () => {
        props.cambiarContenido(props.nombre);
    };

    return (
        <>
            <div className="center_image">
                <button type="button">
                    <img src={require('../images/' + props.img_url)} alt={props.nombre} className="each_imagen_nav" />
                </button>
                <p><strong>{props.nombre}</strong></p>
            </div>
        </>
    )
}