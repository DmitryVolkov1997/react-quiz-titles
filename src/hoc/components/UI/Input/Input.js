import React from "react";
import classes from "./Input.module.scss";

const isInValid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
};

const Input = (props) => {
  const { type, label, value, onChange, errorMessage, onKeyDown, placeholder } =
    props;
  const inputType = type || "text";
  const cls = [classes.input];
  const htmlFor = `${type}-${Math.random()}`;

  if (isInValid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      {isInValid(props) ? (
        <span>{errorMessage || "Введите верное значение"}</span>
      ) : null}
    </div>
  );
};

export default Input;
