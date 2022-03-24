import { Column, Container, Row } from "../../Grid";
import styles from "./textMultiVideo.module.scss";

export default function Video({ primary }) {
  const a11yIframe = primary?.video?.html.replace(
    "<iframe",
    "<iframe title='Video'"
  );
  const videoColumns =
    primary?.width === "half" ? { xs: 14, md: 6 } : { xs: 14, md: 12 };
  const videoOffsets = primary?.width === "half" ? { md: 6 } : { md: 1 };
  return (
    <>
      {primary.video && (
        <div className={styles.video}>
          {/* <Container>
            <Row>
              <Column columns={videoColumns} offsets={videoOffsets}> */}
                <div
                  className={styles.container}
                  dangerouslySetInnerHTML={{ __html: a11yIframe }}
                />
              {/* </Column>
            </Row>
          </Container> */}
        </div>
      )}
    </>
  );
}
