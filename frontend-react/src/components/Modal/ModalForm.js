import React from "react";

function ModalForm( props ) {
    return (
        <form id="new-player-form">
            <input type="hidden" id="index-value" />

            { // Goes through the array to dynamically put the inputs in the form, using array.map
            props.inputsFormData.map( ({placeholder, name}, index) => (
                <div className="form-row" key={'div'+index}>
                    <input type="text" className="form-control" placeholder={placeholder} id={name} name={name}
                    key={`${name}-${index}`} />
                </div>
            ) )
            }

            { // Validates if in the current form there is a Select to put it in screen
                props.formSelect !== "" &&
                    <div className="form-row">
                        <select className="form-control" id="position">
                            <option value=""> {props.formSelect} </option>
                            { props.formSelectOptions.map( ({value, tag}, index) => (
                                <option key={`${index}-${value}`} value={value}> {tag} </option>
                            ) ) }
                        </select>
                    </div>
            }

        </form>
    );
}

export default ModalForm;