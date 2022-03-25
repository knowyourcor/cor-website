import { Column, Container, Row } from "../../Grid";
import styles from "./textMultiVideo.module.scss";

export default function Video({ primary }) {
  const a11yIframe = primary?.video?.html.replace(
    "<iframe",
    "<iframe title='Video'"
  );
  return (
    <>
      {primary.video && (
        <div className={styles.video}>
          <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: a11yIframe }}
          />
        </div>
      )}
    </>
  );
}
