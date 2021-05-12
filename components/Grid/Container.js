// import styles from "./grid.module.scss";
// const Container = (props) => {
//   const offsetBackground = props.hasOffsetBackground
//     ? styles.offsetBackground
//     : "";

//   return (
//     <div
//       className={[styles.Container, offsetBackground, props.classes].join(" ")}
//     >
//       {props.children}
//     </div>
//   );
// };

// export default Container;

// TODO: forward ref
// TODO: pass class name - scoped or non-scoped
import React, { forwardRef } from "react";
import styles from "./grid.module.scss";

const Container = forwardRef(({ children }, ref) => (
  <div ref={ref} className={styles.container}>
    {children}
  </div>
));

export default Container;
