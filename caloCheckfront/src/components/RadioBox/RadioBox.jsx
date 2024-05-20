import React from 'react';
import './RadioBox.css'; 

const RadioBox = ({ label, name, value, onChange, checked  }) => {
  return (
    <label>
      <input 
        type="radio"
        className="radio-box" 
        name={name} 
        value={value} 
        onChange={onChange} 
        checked={checked}
      />
      <span className='radio-style'></span>
      {label}
    </label>
  );
}

export default RadioBox;
