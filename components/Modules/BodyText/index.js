import { RichText } from "prismic-reactjs";

import styles from "./text.module.scss";

const BodyText = ({ primary }) => {
  return (
    <div className={styles.text}>
      <RichText render={primary.text} />
    </div>
  );
};

export default BodyText;
