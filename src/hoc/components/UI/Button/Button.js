import classes from "./Button.module.scss";

const Button = (props) => {
  const { onClick, disabled, type, width } = props;
  const cls = [classes.Button, classes[type]];

  return (
    <button
      className={cls.join(" ")}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
    >
      {props.children}
    </button>
  );
};

export default Button;
