import { useState, useEffect, useRef, createRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";
import { fadeIn } from "../../../lib/variants";

import styles from "./accordionVideo.module.scss";

export default function AccordionVideo({ primary, fields }) {
  const videoRef = useRef();
  const [playVideo, setPlayVideo] = useState(true);

  const [expanded, setExpanded] = useState(0);
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
    setImageData(fields[0]?.video_source);
  }, []);

  const handleProgress = (e) => {
    if (isNaN(e.target.duration))
      return;
    const progress = (e.target.currentTime / e.target.duration) * 100;
  };

  const handleCanPlayThrough = (e) => {
    videoRef.current.play();
  };

  const handleEnded = (e) => {
    const currentIndex = expanded;
    const newIndex = (expanded + 1) % fields.length;

    // Delay moving into the next video
    setTimeout(() => {
      if (currentIndex !== expanded) {
        return;
      }

      setExpanded(newIndex);
      handleImageChange(fields[newIndex].video_source);
    }, 2000);
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
                        isExpanded={index === expanded}
                        expandItem={() => {
                          setExpanded(index);
                          handleImageChange(data.video_source);
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
              {/* <AnimatePresence>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={imageVariant}
                    key={imageData}
                  > */}

              {imageData ? (
                <video
                  ref={videoRef}
                  onTimeUpdate={handleProgress}
                  onCanPlayThrough={handleCanPlayThrough}
                  onEnded={handleEnded}
                  key={imageData}
                  className={styles.video}
                  autoPlay
                  muted
                  playsInline
                >
                  <source src={imageData} type="video/mp4" />
                </video>
              ) : null}

              {/* </motion.div>
                 </AnimatePresence> */}
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
