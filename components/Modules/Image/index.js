import Picture from "../../Picture";
import styles from "./image.module.scss";

const Image = ({ primary }) => {
  console.log(primary)
  return (
    <div className={styles.image}>
      <Picture image={primary.image} />
    </div>
  );
};

export default Image;
