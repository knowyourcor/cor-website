import { useState } from "react";
import Link from "next/link";
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
        <Link href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <Link href="/account">
          <a>Account</a>
        </Link>
        <Link href="/cart">
          <a>Cart</a>
        </Link>
      </div>
      <Menu active={isOpen} toggle={() => toggleMenu()} />
    </>
  );
};

export default Topbar;
