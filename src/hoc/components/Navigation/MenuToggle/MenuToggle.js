import classes from "./MenuToggle.module.scss";

const MenuToggle = (props) => {
    const {onToggle, isOpen} = props;
    const cls = [classes.MenuToggle, 'fa'];

    if (isOpen) {
        cls.push('fa-times', classes.open);
    } else {
        cls.push('fa-bars');
    }

    return (
      <i className={cls.join(" ")} onClick={onToggle}/>
    );
};

export default MenuToggle;
