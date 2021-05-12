import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./accordion.module.scss";
import Roundel from "../../Roundel";

export default function Accordion({ primary, fields }) {
  const [expanded, setExpanded] = useState("item-0");

  function themeFromBackground(bgColor, lightTheme, darkTheme) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkTheme : lightTheme;
  }

  const backgroundColor = primary.background_color;

  const getThemeFromBackground = themeFromBackground(
    backgroundColor,
    "light",
    "dark"
  );

  const { ref, inView } = useInView({
    threshold: 0,
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
    <div
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
      }}
      className={styles[`theme-${getThemeFromBackground}`]}
    >
      <Section className={styles.accordionContainer}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="hidden"
          variants={variants}
          className={styles.svgWrap}
        >
          <div className={styles.contentContainer}>
            <Container>
              <Row>
                {primary.usid === "withRoundel" && (
                  <Column
                    columns={{ xs: 14, sm: 12, md: 6 }}
                    offsets={{ sm: 1 }}
                  >
                    <div className={styles.roundelContainer}>
                      <Roundel index={expanded} />
                    </div>
                  </Column>
                )}

                {primary.image && (
                  <Column
                    columns={{ xs: 14, sm: 12, md: 6 }}
                    offsets={{ sm: 1 }}
                  >
                    <div className={styles.backgroundImage}>
                      <Picture image={primary.image} />
                    </div>
                  </Column>
                )}

                <Column columns={{ xs: 14, sm: 12, md: 6 }} offsets={{ sm: 1 }}>
                  <RichText render={primary.headline} />
                  <div className={styles.accordion}>
                    <motion.div className={styles.items}>
                      {fields.map((data, index) => (
                        <Item
                          key={`item-${index}`}
                          isExpanded={`item-${index}` === expanded}
                          expandItem={() => setExpanded(`item-${index}`)}
                          data={data}
                          index={index}
                        />
                      ))}
                    </motion.div>
                  </div>
                </Column>
              </Row>
            </Container>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
