import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Button from "../../Button";
import Picture from "../../Picture";
import styles from "./textImage.module.scss";

const Paragraph = ({ link, link_label, text, variants }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
    triggerOnce: true,
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

      {link && <Button linkData={link} labelData={link_label} />}
    </motion.div>
  );
};

const TextImage = ({ primary }) => {
  console.log(primary);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const variants = {
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
      className={styles.textImage}
      backgroundColor={primary.background_color}
    >
      <Container>
        {primary.headline[0].text && (
          <Row>
            <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 1 }}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={variants}
              >
                <RichText render={primary.headline} />
              </motion.div>
            </Column>
          </Row>
        )}
        <Row>
          <Column columns={{ xs: 14, md: 10 }} offsets={{ md: 1 }}>
            <Picture image={primary.image} classes={styles.image} />
          </Column>
        </Row>
        <Row>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            <Paragraph {...primary} variants={variants} />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
