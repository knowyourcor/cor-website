import Link from "next/link"
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./textImage.module.scss";

const TextImage = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    trackVisibility: true,
    delay: 100,
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

  return (
    <Section className={styles.textImage} align="center">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="hidden"
          variants={variants}
        >
          {primary.headline[0].text && (
            <Row align="center" textAlign={{ xs: "left" }}>
              <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }} className="custom__column">
                <RichText render={primary.headline} />
              </Column>
            </Row>
          )}
          <Row align="center" textAlign={{ xs: "center" }}>
            <Column
              className={styles.imgWrap}
              columns={
                primary.overlap_text_and_image
                  ? { xs: 14 }
                  : { xs: 14 }
              }
              justify="center"
            >
              <Picture {...primary} classes={styles.image} />
            </Column>
          </Row>
          <Row align="center" textAlign={{ xs: "left" }}>
            <Column
              columns={{ xs: 14, md: 6 }}
              offsets={{ md: 1 }}
              overlaps={primary.overlap_text_and_image ? { md: 2 } : ""}
              justify="center"
              className="custom__column"
            >
              <RichText render={primary.text} />
              <Link href="/"><a className={["btn btn--inverted", styles.invertedLink].join(" ")}>Shop Now</a></Link>
            </Column>
          </Row>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TextImage;
