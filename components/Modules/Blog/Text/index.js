import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../../Grid";
import styles from "./text.module.scss";

export default function Text({ primary }) {
  return (
    <div className={styles.text}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }}>
            <RichText render={primary.section_label} />
          </Column>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            <div className={styles.content}>
              <RichText render={primary.text} />
            </div>
          </Column>
        </Row>
      </Container>
    </div>
  );
}
