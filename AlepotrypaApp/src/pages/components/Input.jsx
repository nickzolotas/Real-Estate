import React from 'react';
import "./style/input.css";

const Input = ({labelText}) => {
  return (
    <>
      <div className="input-group">
        <input required type="text" name="text" autoComplete="off" className="input" />
        <label className="user-label">{labelText}</label>
      </div>
    </>
  );
}

export default Input;
