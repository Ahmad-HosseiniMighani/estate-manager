import React from "react";

const Input = ({ name, label, error, extraClasses, ...rest }) => {
  return (
    <div className={`form-group ${extraClasses}`}>
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <input
        {...rest}
        name={name}
        id={name}
        className={error ? "form-control is-invalid" : "form-control"}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
