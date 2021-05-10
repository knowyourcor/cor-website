import { RichText } from "prismic-reactjs";
import { Container } from "../../Grid";

import styles from "./blogbodytext.module.scss";

const Index = ({ primary }) => {
  return (
    <>
      {primary.text && (
        <Container>
          <div className={styles.contentHolder}>
            <RichText render={primary.text} />
          </div>
        </Container>
      )}
    </>
  )
}

export default Index