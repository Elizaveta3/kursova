import React from 'react';
import './FormRowForEmail.css';

const FormRowForEmail = ({ label, type, id, name, placeholder, onChange, className, value }) => {
    return (
        <div className={`form_row_email ${type === 'textarea' ? 'textarea-row' : ''}`}>
            <label htmlFor={id} className={type === 'textarea' ? 'textarea-label' : ''}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`contact_welcome_input ${className}`}
                    value={value}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`contact_welcome_input ${className}`}
                    value={value}
                />
            )}
        </div>
    );
};

export default FormRowForEmail;
