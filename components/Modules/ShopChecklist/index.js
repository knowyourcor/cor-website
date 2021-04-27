import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Section from "../../Section"
import { Row, Column } from "../../Grid"
import Picture from "../../Picture"

import styles from "./index.module.scss"

export default function Checklist({ primary, fields }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };


  return (
    <Section className={styles.checklistWrap} backgroundColor={primary.background_color}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
      >
        <Row align="center">
          <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }} justify="center">
            <RichText render={primary.heading} />
            <RichText render={primary.text} />
            <div className={styles.listHolder}>
              <ul>
                {fields.map((item, i) => (
                  <li key={i} className={styles.card}>
                    <img src={item.icon.url} />
                    <RichText render={item.item} />
                  </li>
                ))}
              </ul>
            </div>
          </Column>
          <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 1 }} className={styles.cColumn}>
            <Picture image={primary.image} />
          </Column>
        </Row>
      </motion.div>
    </Section>
  )
}