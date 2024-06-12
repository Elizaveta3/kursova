import React from 'react';
import './FormInpuEditingProfile.css';
const FormRowForEditing = ({ label, type, id, name, placeholder, value, onChange }) => {
    return (
        <div className="form_row">
            <label htmlFor={id}>{label}:</label>
            <input type={type} id={id} name={name} placeholder={placeholder} value={value}
                onChange={onChange} />
        </div>
    );
};

export default FormRowForEditing;