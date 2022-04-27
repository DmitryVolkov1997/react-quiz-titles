import React from "react";
import classes from "./Loader.module.scss";

const Loader = () => {
    return (
      <div className={classes.center}>
          <div className={classes.loader}>
              <div/>
              <div/>
          </div>
      </div>
    );
};

export default Loader;
