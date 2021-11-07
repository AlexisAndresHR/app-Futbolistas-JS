import React from "react";

function Input({ type = "text", fieldName, onInput = () => {},
                   placeholder, value = "" }) {
    return (
        <input type={type} className="form-control" id={fieldName} name={fieldName}
            placeholder={placeholder}
            onInput={onInput}
            value={value}
            required />
    );
}

export default Input;