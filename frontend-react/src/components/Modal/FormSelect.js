import React from "react";

function FormSelect( props ) {
    return(
        <select className="form-control"
                id={props.id} name={props.name}
                value={props.value}
                onChange={props.onChange} >
            <option value=""> {props.firstOption} </option>
            { props.formSelectOptions.map( ({value, tag}, index) => (
                <option key={`${index}-${value}`} value={value}> {tag} </option>
            ) ) }
        </select>
    );
}

export default FormSelect;