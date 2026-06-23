import React from 'react';
import "./style/input.css";

// Προσθέτουμε τα props: type, value, onChange
const Input = ({ labelText, isTextArea = false, type = "text", value, onChange }) => {
  return (
    <>
      <div className="input-group">
        {isTextArea ? (
          <textarea 
            required 
            className="input" 
            name='text' 
            rows="4"
            value={value}
            onChange={onChange}
          ></textarea>
        ) : (
          <input 
            required 
            type={type} // Δυναμικό type (text ή password)
            name="text" 
            autoComplete="off" 
            className="input" 
            value={value} // Σύνδεση με το state
            onChange={onChange} // Σύνδεση με το state
          />
        )}
        <label className="user-label">{labelText}</label>
      </div>
    </>
  );
}

export default Input;