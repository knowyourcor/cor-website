import { forwardRef } from "react";
import styles from "./grid.module.scss";

const Container = forwardRef(({ children }, ref) => (
  <div ref={ref} className={styles.container}>
    {children}
  </div>
));

export default Container;
