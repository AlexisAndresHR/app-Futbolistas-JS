//import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

/**
 * Customizable component that returns a form field (Input or Select) based on the name received in props
 * @param handleInput
 * @param object
 * @param fieldName
 * @param options
 * @returns {JSX.Element|boolean}
 * @constructor
 */
function FieldComponent({ handleInput = () => {}, object = {}, fieldName = "", options = {} }) {

    // Code to format the input placeholder and not show the intern field-data name to users
    const str = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);// Capitalizes first letter of the string fieldName
    const newString = str.split(/(?=[A-Z])/);// Separates the string each uppercase letter
    let formattedPlaceholder = "";
    for (let i = 0; i < newString.length; i++){
        formattedPlaceholder += newString[i];
        formattedPlaceholder += " ";// Puts an space after each word
    }

    switch (fieldName) {
        case "position":
        case "hour":
            return (
                <FormSelect
                    fieldName={fieldName}
                    options={options[fieldName]}
                    onChange={handleInput}
                    placeholder={formattedPlaceholder}
                    value={object[fieldName]}
                />
            );

        case "firstName":
        case "lastName":
        case "team":
        case "country":
        case "place":
        case "date":
        case "name":
        case "stadium":
        case "league":
            return (
                <FormInput
                    fieldName={fieldName}
                    type="text"
                    onInput={handleInput}
                    placeholder={formattedPlaceholder}
                    value={object[fieldName]}
                />
            );
        default:
            return false;
    }
}

export default FieldComponent;