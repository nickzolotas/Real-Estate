import React from 'react';
import "./style/input.css";

const Input = ({labelText, isTextArea = false}) => {
  return (
    <>
      <div className="input-group">
        {isTextArea ? (
          <textarea required className="input" name='text' rows="4"></textarea>
        ) : (
          <input required type="text" name="text" autoComplete="off" className="input" />
        )}
        <label className="user-label">{labelText}</label>
      </div>
    </>
  );
}

export default Input;
