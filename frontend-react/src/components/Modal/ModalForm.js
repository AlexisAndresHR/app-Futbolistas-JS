import React from "react";
import FieldComponent from "./FieldComponent";

function ModalForm({ inputsFormData = [], formSelectOptions = [],
                       handleFormInput = ()=>{}, entityObject = {} } ) {
    return (
        <form id="new-register-form">
            <input type="hidden" id="index-value" />

            { // Goes through the array to dynamically put the inputs in the form, using array.map
            inputsFormData.map( (column, index) => (
                <div className="form-row" key={'div-'+index}>
                    <FieldComponent
                        key={index}
                        handleInput={handleFormInput}
                        object={entityObject}
                        fieldName={column}
                        options={formSelectOptions} />
                </div>
            ) )
            }

            { // Goes through the array to dynamically put the inputs in the form, using array.map
                /*
            inputsFormData.map( ({placeholder, name}, index) => (
                <div className="form-row" key={'div'+index}>
                    <FormInput placeholder={placeholder} id={name} name={name}
                               key={`${name}-${index}`}
                               value={entityObject[name]}
                               onInput={handleFormInput} />
                </div>
            ) )
                */
            }
            { // Validates if in the current form there is a Select to put it in screen (JSX conditional)
                /*
                formSelect !== "" &&
                    <div className="form-row">
                        <FormSelect id={formSelectId} name={formSelectId}
                                    value={entityObject[formSelectId]}
                                    onChange={handleFormInput}
                                    firstOption={formSelect}
                                    formSelectOptions={formSelectOptions} />
                    </div>
                */
            }

        </form>
    );
}

export default ModalForm;