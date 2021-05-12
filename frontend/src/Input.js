import React from "react";

const Input = ({ name, type, value, handleChange, placeholder }) => {
  return (
    <>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(event) => handleChange(name, event.target.value)}
      />
    </>
  );
};

export default Input;
