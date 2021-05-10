import { useState, Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { RichText } from "prismic-reactjs";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Item from "./Item";
import Pagination from "./Pagination";
import styles from "./quadCarousel.module.scss";

export default function QuadCarousel({ primary, fields }) {
  console.log(primary, fields);

  // Clone fields and add an ID based on index
  const cloneFields = fields.map((field, index) => {
    const id = { id: index + 1 };
    return Object.assign(field, id);
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
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

  const variants = {
    enter: {
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.5 },
    },
  };

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
      className={styles.quadCarousel}
      align="center"
      style={{ backgroundColor: primary.background_color }}
    >
      <Container>
        <Row justify="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 12 }}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={fadeInVariants}
            >
              <RichText render={primary.heading} />
            </motion.div>
          </Column>
        </Row>
        <Row justify="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 12, md: 8 }}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={fadeInVariants}
            >
              <RichText render={primary.paragraph} />
            </motion.div>
          </Column>
        </Row>
      </Container>
      <div className={styles.container}>
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
