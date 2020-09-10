import styles from "./image.module.scss";

const Image = ({ primary }) => {
  return (
    <img
      className={styles.image}
      src={primary.image.xxl.url}
      alt={primary.image.alt}
    />
  );
};

export default Image;
