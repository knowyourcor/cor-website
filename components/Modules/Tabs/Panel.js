import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";

import styles from "./tabs.module.scss";

export default function Panel({ text, image }) {
  const panelVariant = {
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
