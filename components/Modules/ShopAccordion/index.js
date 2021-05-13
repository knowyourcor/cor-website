import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./shopAccordion.module.scss";

export default function ShopAccordion({ primary, fields }) {
  const [expanded, setExpanded] = useState("item-0");
  const [imageData, setImageData] = useState();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const backgroundColor = primary.background_color
    ? primary.background_color
    : "transparent";

  const handleImageChange = (data) => {
    setImageData(data);
  };

  useEffect(() => {
    setImageData(fields[0]?.image);
  }, []);

  const transition = {
    duration: 0.3,
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

  const imageTransition = {
    duration: 0.5,
    ease: "easeOut",
  };

  const imageVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: imageTransition,
    },
    hidden: {
      opacity: 0,
      y: "-8%",
      transition: imageTransition,
    },
    exit: {
      opacity: 0,
      y: "8%",
      transition: imageTransition,
    },
  };

  return (
    <Section
      style={{
        backgroundColor: backgroundColor,
      }}
      className={styles.container}
    >
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 5, xl: 4 }} offsets={{ md: 1 }}>
            <div className={styles.contentOffset}>
              <RichText render={primary.headline} />
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={variants}
              >
                <div className={styles.accordion}>
                  <motion.div className={styles.items}>
                    {fields.map((data, index) => (
                      <Item
                        key={`item-${index}`}
                        isExpanded={`item-${index}` === expanded}
                        expandItem={() => {
                          setExpanded(`item-${index}`);
                          handleImageChange(data.image);
                        }}
                        data={data}
                        index={index}
                        backgroundColor={backgroundColor}
                        changeImage={handleImageChange}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Column>
          <Column
            columns={{ xs: 14, md: 7, xl: 8 }}
            offsets={{ md: 1 }}
            className={styles.columnPaddingRight}
          >
            <div className={styles.imageContainer}>
              {imageData && (
                <AnimatePresence>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={imageVariant}
                    key={imageData.url}
                  >
                    <Picture image={imageData} className={styles.image} />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </Column>
        </Row>
      </Container>
      {/* <Container>
      </Container>
      <div className={styles.imageWrap}>
        {imageData && (
          <div className={styles.primaryImage}>
            <AnimatePresence initial={false}>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariant}
                key={imageData.url}
              >
                <Picture image={imageData} className={styles.image} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div> */}
    </Section>
  );
}
