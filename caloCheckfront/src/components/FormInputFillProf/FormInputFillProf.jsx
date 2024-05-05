import React from 'react';
import './FormInputFillProf.css'; 

const FormInput = ({ placeholder, id}) => {
  
  return (
    <input 
      type="number" 
      className="form_input_field_fill_prof" 
      placeholder={placeholder} 
      id={id} 
    />
  );
}

export default FormInput;
