import React from 'react';

export const ButtonNB = (props) => {
    return (
        <>
            <div className="center_image">
                <button type="button">  
                    <img src={require('../images/' + props.img_url)} alt={props.nombre} onClick={() => {
                        alert("llega al clcick")}} className="each_imagen_nav"></img>
                </button>
                <p><strong>{props.nombre}</strong></p>
            </div>
        </>
    )
}