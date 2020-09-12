import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";

import styles from "./profiles.module.scss";

export default function Content({
  profile_name,
  profile_description,
  profile_text,
  profile_type,
  profile_score,
  image,
}) {
  const contentVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
      },
    },
  };

  // Check if the profile score is - or +. CMS only returns a "-" for negative numbers.
  // Add a "+" for positive numbers.
  const profileScoreSign =
    Math.sign(profile_score) < 0 ? profile_score : `+${profile_score}`;

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariant}
      className={styles.content}
    >
      <div className={styles.container}>
        <Row align="center">
          <Column columns={{ xs: 14, sm: 7 }} overlaps={{ md: 1 }} zIndex={0}>
            <div className={styles.profileImageContainer}>
              <div className={styles.profileType}>
                <p>{profile_type[0].text}</p>
              </div>
              <div className={styles.profileScore}>
                <p>{profileScoreSign}</p>
              </div>
              <img
                src={image.xxl.url}
                alt={image.alt}
                className={styles.profileImage}
              />
            </div>
          </Column>
          <Column
            columns={{ xs: 14, sm: 6 }}
            zIndex={10}
            alignSelf={{ sm: "center" }}
          >
            <div className={styles.profileContentContainer}>
              <h3>{profile_name[0].text}</h3>
              <p>
                <small>{profile_description[0].text}</small>
              </p>
              <RichText render={profile_text} />
            </div>
          </Column>
        </Row>
      </div>
    </motion.div>
  );
}
