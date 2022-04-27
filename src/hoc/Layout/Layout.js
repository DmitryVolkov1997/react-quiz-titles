import React, {useState} from "react";
import {Outlet} from 'react-router-dom';
import classes from "./Layout.module.scss";
import MenuToggle from "../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../components/Navigation/Drawer/Drawer";

const Layout = () => {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const menuCloseHandler = () => {
        setMenu(false);
    };


    return (
      <div className={classes.layout}>
          <MenuToggle onToggle={toggleMenu} isOpen={menu}/>
          <Drawer isOpen={menu} onClose={menuCloseHandler}/>
          <div className={classes.main}>
              <Outlet/>
          </div>
      </div>
    );
};

export default Layout;
