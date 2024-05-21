import React from 'react';
import './FormInputFillProf.css'; 

const FormInput = ({ placeholder, name, id, onChange }) => {
  
  return (
    <input style={{}}
      type="number" 
      className="form_input_field_fill_prof" 
      placeholder={placeholder} 
      name={name} 
      id={id}
      onChange={onChange} 
    />
  );
}

export default FormInput;
