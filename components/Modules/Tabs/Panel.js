import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";

import styles from "./tabs.module.scss";

export default function Panel({ text, image }) {
  const panelVariant = {
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

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        layout
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariant}
      >
        <div className={styles.container}>
          <Row align="center">
            <Column columns={{ xs: 14, md: 5 }}>
              <RichText render={text} />
            </Column>
            <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 2 }}>
              <img
                src={image.xxl.url}
                alt={image.alt}
                className={styles.image}
              />
            </Column>
          </Row>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
