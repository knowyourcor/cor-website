import { Container, Row, Column } from "../Grid";
import { useState } from "react";
import Logo from "../Logo";
import Menu from "../Menu";

import styles from "./topbar.module.scss";

const Topbar = () => {
  const [isOpen, toggleOpen] = useState(false);

  const toggleMenu = () => {
    toggleOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.topbar}>
        <button onClick={() => toggleMenu()}>Menu</button>
        <Logo />
        <button>Account</button>
        <button>Cart</button>
      </div>
      <Menu active={isOpen} toggle={() => toggleMenu()} />
    </>
  );
};

export default Topbar;
