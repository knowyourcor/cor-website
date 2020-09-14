import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";
import RoundelMeter from "../../RoundelMeter";

import styles from "./profiles.module.scss";

export default function Panel({
  profile_name,
  profile_description,
  profile_text,
  profile_type,
  profile_score,
  image,
}) {
  const panelVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const imageVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const imageItemVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contentVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const contentItem = {
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Check if the profile score is - or +. CMS only returns a "-" for negative numbers.
  // Add a "+" for positive numbers.
  const profileScoreSign =
    Math.sign(profile_score) < 0 ? profile_score : `+${profile_score}`;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariant}
      >
        <Row align="center">
          <Column columns={{ xs: 14, sm: 7 }} overlaps={{ md: 1 }} zIndex={0}>
            <motion.div
              variants={imageVariant}
              className={styles.imageContainer}
            >
              <div className={styles.profileType}>
                <p>{profile_type[0].text}</p>
              </div>
              <div className={styles.profileScore}>
                <RoundelMeter score={profileScoreSign} />
              </div>
              <img
                src={image.xxl.url}
                alt={image.alt}
                className={styles.profileImage}
              />
            </motion.div>
          </Column>
          <Column
            columns={{ xs: 14, sm: 6 }}
            zIndex={10}
            alignSelf={{ sm: "center" }}
          >
            <motion.div
              variants={contentVariant}
              className={styles.profileContent}
            >
              <motion.h3 variants={contentItem}>
                {profile_name[0].text}
              </motion.h3>
              <motion.p variants={contentItem}>
                <small>{profile_description[0].text}</small>
              </motion.p>
              <motion.div variants={contentItem}>
                <RichText render={profile_text} />
              </motion.div>
            </motion.div>
          </Column>
        </Row>
      </motion.div>
    </AnimatePresence>
  );
}
