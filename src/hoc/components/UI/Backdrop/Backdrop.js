import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
    const {onClick} = props;

    return (
      <div className={classes.Backdrop} onClick={onClick}>

      </div>
    );
};

export default Backdrop;
