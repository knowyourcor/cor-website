import styles from "./grid.module.scss";
const Container = (props) => {
  const offsetBackground = props.hasOffsetBackground
    ? styles.offsetBackground
    : "";

  return (
    <div
      className={[styles.Container, offsetBackground, props.classes].join(" ")}
    >
      {props.children}
    </div>
  );
};

export default Container;
