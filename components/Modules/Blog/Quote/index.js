import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../../Grid";
import styles from "./quote.module.scss";

export default function Quote({ primary }) {
  return (
    <Container>
      <Row>
        <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 6 }}>
          <div className={styles.quote}>
            <blockquote>
              <RichText render={primary.quote} />
            </blockquote>
            {primary.attribution && (
              <figcaption>—{primary.attribution[0]?.text}</figcaption>
            )}
          </div>
        </Column>
      </Row>
    </Container>
  );
}
