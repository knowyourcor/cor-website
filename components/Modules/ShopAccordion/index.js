import { useState, useEffect } from "react";
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
    opacity: {
      duration: 0.45,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
    y: {
      duration: 0.75,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
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
    >
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 6, lg: 5 }} offsets={{ md: 1, lg: 1 }} className="custom__column">
            {primary.headline[0].text && (
              <div className={styles.headline}>
                <RichText render={primary.headline} />
              </div>
            )}
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
                    changeImage={handleImageChange}
                  />
                ))}
              </motion.div>
            </div>
          </Column>
          {/* <Column columns={{ xs: 14, sm: 10, md: 7, lg: 7 }}>
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
          </Column> */}
        </Row>
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
        <Row justify="flex-end">
          <Column columns={{ xs: 14, sm: 10, md: 7, lg: 7 }}>
          </Column>
        </Row>
        {/* {imageData && (
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
        )} */}
      </div>
    </Section>
  );
}
