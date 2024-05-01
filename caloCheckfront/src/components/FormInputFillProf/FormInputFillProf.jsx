import React from 'react';
import './FormInputFillProf.css'; 
const FormInput = ({ placeholder }) => {
  return (
    <input type="text" className="form_input_field_fill_prof" placeholder={placeholder} />
  );
}

export default FormInput;
