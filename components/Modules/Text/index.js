import { RichText } from "prismic-reactjs";

import styles from "./text.module.scss";

const Text = ({ primary }) => {
  return (
    <div className={styles.text}>
      <RichText render={primary.text} />
    </div>
  );
};

export default Text;
