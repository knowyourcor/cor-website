import { Container, Row, Column } from "../../../Grid";
import styles from "./video.module.scss";

export default function Video({ primary }) {
  const a11yIframe = primary?.video?.html.replace(
    "<iframe",
    "<iframe title='Video'"
  );
  return (
    <>
      {primary.video && (
        <div className={styles.video}>
          <Container>
            <Row>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                <div
                  className={styles.container}
                  dangerouslySetInnerHTML={{ __html: a11yIframe }}
                />
              </Column>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
