import React from 'react';
import './RadioBox.css'; 
const RadioBox = ({ label, name }) => {
  return (
    <label>
      <input className="radio-box" type="radio" name={name}/>
      <span className='radio-style'></span>
      {label}
    </label>
  );
}

export default RadioBox;
