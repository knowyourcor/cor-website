import { RichText } from "prismic-reactjs";
import { Container } from "../../Grid";

import styles from "./text.module.scss";

const BodyText = ({ primary }) => {
  return (
    <Container>
      <div className={styles.text}>
        <RichText render={primary.text} />
      </div>
    </Container>
  );
};

export default BodyText;
