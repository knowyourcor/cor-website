import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Row, Column, Container } from "../../Grid";
import Picture from "../../Picture";
import styles from "./checklist.module.scss";

export default function Checklist({ primary, fields }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
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
      className={styles.checklistContainer}
      backgroundColor={primary.background_color}
    >
      <Container ref={ref}>
        <Row>
          <Column
            columns={{ xs: 14, md: 4 }}
            offsets={{ md: 1 }}
            ordering={{ xs: 2, md: 1 }}
          >
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
            >
              <RichText render={primary.headline} />
              <RichText render={primary.text} />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.checklist}
            >
              <ul className={styles.checklistItems}>
                {fields.map((item, i) => (
                  <li className={styles.item} key={`list_item_${i}`}>
                    <div className={styles.checkmark} aria-hidden="true">
                      <img src={item.icon.url} className={styles.icon} />
                    </div>
                    <span>
                      <RichText render={item.text} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Column>
          <Column
            className={styles.cColumn}
            columns={{ xs: 14, md: 7 }}
            offsets={{ md: 1 }}
            ordering={{ xs: 1, md: 2 }}
          >
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
