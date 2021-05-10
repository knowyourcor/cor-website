import { RichText } from "prismic-reactjs";
import { Container } from "../../Grid";

import styles from "./quote.module.scss";

const Index = ({ primary }) => {
  return (
    <>
      {primary.quote && (
        <Container>
          <div className={styles.quoteText}>
            <RichText render={primary.quote} />
          </div>
        </Container>
      )}
    </>
  )
}

export default Index