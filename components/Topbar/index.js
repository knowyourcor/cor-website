import { Container, Row, Column } from "../Grid";
import Logo from "../Logo";

import styles from "./topbar.module.scss";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <button>Menu</button>
      <Logo />
      <button>Account</button>
      <button>Cart</button>
    </div>
  );
};

export default Topbar;
