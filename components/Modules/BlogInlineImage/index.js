import { RichText } from "prismic-reactjs";
import { Container } from "../../Grid";
import Picture from "../../Picture";

import styles from "./inlineimage.module.scss";

const Index = ({ primary }) => {
  console.log(primary)
  return (
    <Container>
      {primary.image && <Picture image={primary.image} />}
      <div className={styles.contentText}>
        <div className={styles.contentHolder}>
          <RichText render={primary.heading} />
        </div>
        <div className={styles.contentHolder}>
          <RichText render={primary.body_text} />
        </div>
      </div>
    </Container>
  )
}

export default Index