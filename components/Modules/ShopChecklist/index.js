import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss";

const Channel = ({ icon, item, fadeInVariants }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={fadeInVariants}
      className={styles.card}
    >
      <img src={icon.url} />
      <RichText render={item} />
    </motion.li>
  );
};

export default function Checklist({ primary, fields }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  return (
    <Section
      className={styles.checklistWrap}
      backgroundColor={primary.background_color}
    >
      <Row align="center">
        <Column
          className={styles.contentText}
          columns={{ xs: 14, md: 4 }}
          offsets={{ md: 1 }}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit="hidden"
            variants={fadeInVariants}
          >
            <RichText render={primary.heading} />
            <RichText render={primary.text} />
          </motion.div>
          <div className={styles.listHolder}>
            <ul>
              {fields.map((item, i) => (
                <Channel key={i} {...item} fadeInVariants={fadeInVariants} />
              ))}
            </ul>
          </div>
        </Column>
        <Column
          className={styles.cColumn}
          columns={{ xs: 14, md: 8 }}
          offsets={{ md: 1 }}
        >
          <Picture image={primary.image} />
        </Column>
      </Row>
    </Section>
  );
}
