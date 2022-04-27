import React, {useState} from "react";
import classes from "./Drawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {
        to: '/', label: "Список тестов"
    },
    {
        to: '/auth', label: "Авторизация"
    },
    {
        to: '/quiz-creator', label: "Создать тест"
    },
];

const Drawer = (props) => {
    const {isOpen, onClose} = props;
    const cls = [classes.Drawer];

    const renderLinks = () => {
        return links.map((link, i) => {
            return (
              <li className={classes.item} key={i}>
                  <NavLink onClick={onClose} className={classes.link} to={link.to}>{link.label}</NavLink>
              </li>
            );
        });
    };

    if (!isOpen) {
        cls.push(classes.close);
    }

    return (
      <>
          <nav className={cls.join(" ")}>
              <ul>
                  {
                      renderLinks()
                  }
              </ul>
          </nav>
          {isOpen && <Backdrop onClick={onClose}/>}
      </>
    );
};

export default Drawer;
