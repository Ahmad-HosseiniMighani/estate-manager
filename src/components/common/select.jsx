// import React from "react";

const Select = ({ name, label, options, error, customClass = "", ...rest }) => {
  return (
    <div
      className={
        !customClass ? "form-group col-md-5" : `form-group ${customClass}`
      }
    >
      <label htmlFor={name} className="form-label">{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
