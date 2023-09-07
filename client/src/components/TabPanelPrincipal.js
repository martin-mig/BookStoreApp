import React from 'react';
import { useState } from "react";
import { CheckboxInput } from './CheckboxInput';

export const TabPanelPrincipal = (prop) => {
    console.log(prop.NavActiva);
    console.log(prop.itemNav);

    const itemCheckBox = {
        books: ["title", "author", "category", "isbn", "published","status"],
        users: ["firstname", "lastname"],
      };

    const [getPanelActiva, setPanelActiva] = useState("");  

    const [getObjectPanelActiva, setObjectPanelActiva] = useState("")  


    const cambiarTabClick = (item) => {
        setPanelActiva(item);
        setObjectPanelActiva(itemCheckBox[item]);
      
    };  

    return (
        <>
            <div className="tab-pane fade active in">
                <div className="imagen_nav">
                    {prop.itemNav.map((item, index) => (
                        <div className="center_image" key={index}>
                            <button type="button" onClick={() => cambiarTabClick(item)} >
                                <img
                                src={require(`../images/${item}.png`)}
                                alt={item}
                                className="each_imagen_nav"
                                />
                            </button>
                            <p><strong>{item.charAt(0).toUpperCase() + item.slice(1)}</strong></p>
                        </div>
                    ))}

                </div>
            </div>

           <div className="row g-3 text-left">
                                              
                <CheckboxInput name={getPanelActiva} inputs={getObjectPanelActiva}  />    
                                                

            </div>
            
        </>
    )
}