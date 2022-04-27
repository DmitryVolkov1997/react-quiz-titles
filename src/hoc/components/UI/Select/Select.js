import React from "react";
import classes from "./Select.module.scss";

const Select = (props) => {
    const {label, value, onChange, options} = props;
    const htmlFor = `${label}-${Math.random()}`;

    return (
      <div className={classes.select}>
          <label className={classes.label} htmlFor={htmlFor}>{label}</label>
          <select id={htmlFor} value={value} onChange={onChange}>
              {
                  options.map((option, i) => {
                      return (
                        <option key={option.value + i} value={option.value}>
                            {option.text}
                        </option>
                      );
                  })
              }
          </select>
      </div>
    );
};

export default Select;
