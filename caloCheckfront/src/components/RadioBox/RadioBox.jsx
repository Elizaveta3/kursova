import React from 'react';
import './RadioBox.css'; 

const RadioBox = ({ label, name, value, onChange }) => {
  return (
    <label>
      <input 
        type="radio"
        className="radio-box" 
        name={name} 
        value={value} 
        onChange={onChange} 
      />
      <span className='radio-style'></span>
      {label}
    </label>
  );
}

export default RadioBox;
