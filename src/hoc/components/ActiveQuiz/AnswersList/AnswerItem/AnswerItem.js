import React from "react";
import classes from "./AnswerItem.module.scss";

const AnswerItem = (props) => {
    const {id, text, onAnswerClick, state} = props;
    const cls = [classes.AnswerItem];

    if (state) {
        cls.push(classes[state]);
    }

    return (
      <li className={cls.join(" ")} onClick={() => onAnswerClick(id)}>
          {text}
      </li>
    );
};

export default AnswerItem;
