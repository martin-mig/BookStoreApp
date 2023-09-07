import React, {useState} from 'react'

export const CheckboxInput = ({ name, inputs, handleInputChange }) =>{

   
    return(
        <>
            <div className="col-md-4">
                <div className="checkbox">
                    <label className="custom-label"><input type="checkbox" value=""    checked={inputs[name] !== ''} readOnly></input> <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong></label>
                    <input type="text"   name={name}   value={inputs[name]} onChange={handleInputChange}></input>        
                </div>
            </div>   
        </>
    )
}