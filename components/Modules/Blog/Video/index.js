import { Container, Row, Column } from "../../../Grid";
import styles from "./video.module.scss";

export default function Video({ primary }) {
  return (
    <div className={styles.video}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
            <div
              className={styles.container}
              dangerouslySetInnerHTML={{ __html: primary.video.html }}
            />
          </Column>
        </Row>
      </Container>
    </div>
  );
}
