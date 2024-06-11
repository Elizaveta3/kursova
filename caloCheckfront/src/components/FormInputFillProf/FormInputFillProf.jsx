import React from 'react';
import './FormInputFillProf.css'; 

const FormInput = ({  name, id, onChange }) => {
  
  return (
    <input style={{}}
      type="number" 
      className="form_input_field_fill_prof" 
      name={name} 
      id={id}
      onChange={onChange} 
    />
  );
}

export default FormInput;
