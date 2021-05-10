import { RichText } from "prismic-reactjs";

import styles from "./video.module.scss";

const Index = ({ primary }) => {
  return (
    <div className={styles.mediaHolder}>
      {primary?.embed_media?.html && (
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{ __html: primary?.embed_media?.html }}
        />
      )}
    </div>
  )
}

export default Index