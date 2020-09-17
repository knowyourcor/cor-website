import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./shop.module.scss";

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
        <div className={styles.panel}>
          <Row align="center">
            <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }}>
              <Picture image={image} classes={styles.image} />
            </Column>
            <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }}>
              <div className={styles.content}>
                <RichText render={text} />
              </div>
            </Column>
          </Row>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
