import React from "react";

function Select({ options = [], fieldName = "vacio", onChange = () => {},
                    placeholder, value = "" }) {
    return (
        <select id={fieldName} name={fieldName} className="form-control"
            onChange={onChange}
            value={value}
        >
            <option value=""> Select {placeholder} </option>
            {options.map(({ it, tag }, index) => (
                <option key={`${fieldName}-${index}-${it}-${tag}`} value={it} >
                    { tag }
                </option>
            ))}
        </select>
    );
}

export default Select;