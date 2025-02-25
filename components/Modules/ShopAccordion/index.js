import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";
import { fadeIn } from "../../../lib/variants";

import styles from "./shopAccordion.module.scss";

export default function ShopAccordion({ primary, fields }) {
  const [expanded, setExpanded] = useState("item-0");
  const [imageData, setImageData] = useState();
  const { ref, inView } = useInView({
    threshold: 0.05,
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
      className={[
        styles.container,
        primary.usid ? styles[primary.usid] : "",
      ].join(" ")}
    >
      <Container ref={ref}>
        <Row>
          <Column
            columns={{ xs: 14, md: 5, xl: 4 }}
            offsets={{ md: 1 }}
            ordering={{ xs: 2, md: 1 }}
          >
            <div className={styles.contentOffset}>
              <RichText render={primary.headline} />
              <motion.div
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={fadeIn}
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
            ordering={{ xs: 1, md: 2 }}
            className={styles.columnPaddingRight}
          >
            <div
              className={[styles.imageContainer, styles[`${expanded}`]].join(
                " "
              )}
            >
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
    </Section>
  );
}
