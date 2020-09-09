import { useState } from "react";
import Link from "../Link";
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
        <div className={styles.container}>
          <button onClick={() => toggleMenu()} className={styles.menuToggle}>
            Menu
          </button>
          <Link href="/">
            <a className={styles.logo}>
              <Logo />
            </a>
          </Link>
          <div className={styles.utility}>
            <Link activeClassName={styles.active} href="/account">
              <a>Account</a>
            </Link>
            <Link activeClassName={styles.active} href="/cart">
              <a>Cart</a>
            </Link>
          </div>
        </div>
      </div>
      <Menu active={isOpen} toggle={() => toggleMenu()} />
    </>
  );
};

export default Topbar;
