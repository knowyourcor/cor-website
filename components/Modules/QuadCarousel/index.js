import { useState, Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { RichText } from "prismic-reactjs";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Item from "./Item";
import Pagination from "./Pagination";
import { fadeIn } from "../../../lib/variants";
import styles from "./quadCarousel.module.scss";

export default function QuadCarousel({ primary, fields }) {
  // Clone fields and add an ID based on index
  const cloneFields = fields.map((field, index) => {
    const id = { id: index + 1 };
    return Object.assign(field, id);
  });

  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  const [active, setActive] = useState(1);

  const handleNext = () => {
    if (active < cloneFields.length) {
      setActive((prev) => prev + 1);
    } else {
      setActive(1);
    }
  };

  const handlePrevious = () => {
    if (active === 1) {
      setActive(cloneFields.length - 1);
    } else {
      setActive((prev) => prev - 1);
    }
  };

  const variants = {
    enter: {
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.5 },
    },
  };

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => handlePrevious(),
    onSwipedLeft: (eventData) => handleNext(),
    onTap: (event) => handleNext(),
  });

  return (
    <Section
      className={styles.quadCarousel}
      align="center"
      style={{ backgroundColor: primary.background_color }}
    >
      <Container ref={ref}>
        <Row justify={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 12 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={fadeIn}
            >
              <RichText render={primary.heading} />
            </motion.div>
          </Column>
        </Row>
        <Row justify={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 12, md: 8 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={fadeIn}
            >
              <RichText render={primary.text} />
            </motion.div>
          </Column>
        </Row>
      </Container>
      <div className={styles.container} {...handlers}>
        <AnimatePresence>
          <motion.div
            variants={variants}
            initial="exit"
            animate="enter"
            exit="exit"
            className={styles.programs}
          >
            {cloneFields.map((props) => (
              <Fragment key={`item_${props.id}`}>
                {active === props.id && <Item {...props} />}
              </Fragment>
            ))}
            <Pagination
              items={cloneFields}
              active={active}
              setActive={setActive}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
