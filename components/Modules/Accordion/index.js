import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./accordion.module.scss";

const HealthMeter = ({ fields, expanded }) => (
  <>
    {fields.map((data, index) => {
      let isExpanded = `item-${index}` === expanded;
      return (
        <div key={index} className={styles.svgWrap} key={index}>
          {isExpanded && (
            <motion.svg
              viewBox="0 0 148 148"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.svgPieGraph}
            >
              <g transform="translate(24 24)" fill="none" fillRule="evenodd">
                <circle
                  stroke="#E5E0DF"
                  strokeWidth="2"
                  cx="50"
                  cy="50"
                  r="41.75"
                />
                <motion.circle
                  stroke={fields[1].meter_color}
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
                {fields.length === 4 && (
                  <motion.circle
                    stroke={fields[3].meter_color}
                    strokeWidth="19"
                    cx="50"
                    cy="50"
                    r={index === 3 && isExpanded ? 55 : 50}
                    style={{
                      strokeDasharray: index === 3 && isExpanded ? 360 : 328,
                      strokeWidth: index === 3 && isExpanded ? 29 : 19,
                    }}
                    animate={{
                      rotate: [180, 35],
                      strokeDashoffset: [270, 270],
                    }}
                    transition={{
                      duration: 3,
                      times: [0, 1],
                      ease: "anticipate",
                    }}
                  />
                )}
                <motion.circle
                  stroke={fields[2].meter_color}
                  strokeWidth="29"
                  cx="50"
                  cy="50"
                  r={index === 2 && isExpanded ? 55 : 50}
                  style={{
                    strokeDasharray: index === 2 && isExpanded ? 343 : 336,
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
                <motion.circle
                  stroke={fields[0].meter_color}
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
          )}
        </div>
      );
    })}
  </>
);

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
      <Section className={styles.section}>
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
              <Row align="center">
                <Column columns={{ xs: 14, sm: 12, md: 6 }} offsets={{ sm: 1 }}>
                  <HealthMeter fields={fields} expanded={expanded} />
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
            {primary.image && <Picture image={primary.image} />}
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
