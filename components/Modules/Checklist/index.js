import { useState } from "react"
import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Section from "../../Section"
import { Container, Row, Column } from "../../Grid"
import Picture from "../../Picture"

import styles from "./index.module.scss"

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, variants }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
    </motion.div>
  );
};

const Paragraph = ({ text, variants }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <RichText render={text} />
    </motion.div>
  )
}

export default function Checklist({ primary, fields }) {
  const [checkedItems, setCheckedItems] = useState({});
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
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

  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Section className={styles.checklistWrap} backgroundColor={primary.background_color}>
      <Container>
        <Row align="center">
          <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }} className="custom__column">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={variants}
            >
              <RichText render={primary.heading} />
            </motion.div>
            <div className={styles.listHolder}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <RichText render={primary.heading3} />
                  <p>2 Days Left</p>
                  <h6>Check-in</h6>
                  <div className={styles.actionHolder}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <g transform="translate(-1228 -6342)">
                          <circle cx="20" cy="20" r="20" fill="#6fda8c" transform="translate(1228 6342)" />
                          <g>
                            <path fill="#23a046" d="M1499.759 458.341a1.49 1.49 0 0 1-1.138-.528l-4.391-5.187a1.491 1.491 0 1 1 2.276-1.926l3.148 3.719 5.675-8.01a1.491 1.491 0 1 1 2.433 1.724l-6.787 9.579a1.491 1.491 0 0 1-1.152.628z" transform="translate(-252.957 5909.939)" />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <div className={styles.actionDetails}>
                      <h6>Checked-in</h6>
                      <p>Next Check-in. Tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>
              <form className={styles.cardList}>
                {fields.map((item, i) => (
                  <div key={i} className={[styles.card, checkedItems[item.checklist_item[0].text] && styles.active].join(" ")}>
                    <label>
                      <RichText render={item.checklist_item} />
                      <Checkbox
                        name={item.checklist_item[0].text}
                        checked={checkedItems[item.checklist_item[0].text]}
                        onChange={handleChange}
                        variants={variants}
                      />
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </Column>
          <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 1 }} className={styles.cColumn}>
            <Picture image={primary.image} />
            <Paragraph
              {...primary}
              variants={variants}
            />
          </Column>
        </Row>
      </Container>
    </Section>
  )
}