import React from "react";
import style from "./styles.less";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={style.warp}>
      <div className={style.left}>
        <Link to="/">
          <img src={require("@images/logo_dx.png")} className={style.logo} />
        </Link>
        <span className={style.title}>金服管理后台脚手架3.0</span>
      </div>
      <div className={style.right}>
        <a className={style.exit}>安全退出</a>
      </div>
    </div>
  );
};

export default Header;
