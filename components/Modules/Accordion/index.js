import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./accordion.module.scss";

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

  return (
    <div
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
      }}
      className={styles[`theme-${getThemeFromBackground}`]}
    >
      <Section className={styles.section}>
        <div className={styles.contentContainer}>
          <Container>
            <Row align="center">
              <Column columns={{ xs: 14, sm: 12, md: 6 }} offsets={{ sm: 1 }}>
                {fields.map((data, index) => {
                  let isExpanded = `item-${index}` === expanded
                  return (
                    <div className={styles.svgWrap} key={index}>
                      {isExpanded &&
                        <motion.svg viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg" className={styles.svgPieGraph}>
                          <g transform="translate(24 24)" fill="none" fillRule="evenodd">
                            {/* Gray */}
                            <circle stroke="#E5E0DF" strokeWidth="2" cx="50" cy="50" r="41.75" />
                            {/* Orange */}
                            <motion.circle
                              stroke="#ff7048"
                              strokeWidth="19"
                              cx="50"
                              cy="50"
                              r={index === 1 && isExpanded ? 55 : 50.242}
                              style={{
                                strokeDasharray: index === 1 && isExpanded ? 337 : 332,
                                strokeWidth: index === 1 && isExpanded ? 29 : 19,
                              }}
                              animate={{
                                rotate: [180, 250],
                                strokeDashoffset: [270, 270],
                              }}
                              transition={{
                                duration: 3,
                                times: [0, 1],
                                ease: "anticipate",
                              }}
                            />

                            {/* Dark teal */}
                            <motion.circle
                              stroke="#004462"
                              strokeWidth="29"
                              cx="50"
                              cy="50"
                              r={index === 2 && isExpanded ? 56 : 50}
                              style={{
                                strokeDasharray: index === 2 && isExpanded ? 360 : 328,
                                strokeWidth: index === 2 && isExpanded ? 29 : 19,
                              }}
                              animate={{
                                rotate: [45, -40],
                                strokeDashoffset: [270, 270],
                              }}
                              transition={{
                                duration: 3,
                                times: [0, 1],
                                ease: "anticipate",
                              }}
                            />

                            {/* Green */}
                            <motion.circle
                              stroke="#6cdc89"
                              strokeWidth="29"
                              cx="50"
                              cy="50"
                              r={index === 0 && isExpanded ? 55 : 50}
                              style={{
                                strokeDasharray: index === 0 && isExpanded ? 360 : 331,
                                strokeWidth: index === 0 && isExpanded ? 29 : 19,
                              }}
                              animate={{
                                rotate: [90, 180],
                                strokeDashoffset: [270, 270],
                              }}
                              transition={{
                                duration: 3,
                                times: [0, 1],
                                ease: "anticipate",
                              }}
                            />
                          </g>
                        </motion.svg>
                      }

                    </div>
                  )
                })}
              </Column>
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
        <div className={styles.backgroundImage}>
          {primary.image && (
            <Picture image={primary.image} />
          )}
        </div>
      </Section>
    </div>
  );
}
