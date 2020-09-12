import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";

import styles from "./profiles.module.scss";

export default function Content({
  tab_name,
  profile_name,
  profile_description,
  profile_text,
  profile_type,
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
          <Column columns={{ xs: 14, sm: 7 }}>
            <RichText render={profile_name} />
            <RichText render={profile_description} />
            <RichText render={profile_text} />
            <RichText render={profile_type} />
          </Column>
          <Column columns={{ xs: 14, sm: 7 }}>
            <img src={image.xxl.url} alt={image.alt} className={styles.image} />
          </Column>
        </Row>
      </div>
    </motion.div>
  );
}
