import React from "react";

function FormInput( props ) {
    return(
        <input type="text" className="form-control"
               placeholder={props.placeholder} id={props.id} name={props.name}
               value={props.value}
               onInput={props.onInput} required />
    );
}

export default FormInput;