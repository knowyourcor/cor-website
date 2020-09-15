import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
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
      <Section align="center">
        <Container>
          <Row align="center">
            <Column columns={{ xs: 14, sm: 8, md: 7 }} offsets={{ sm: 1 }}>
              <RichText render={primary.headline} />
            </Column>
          </Row>

          <Row align="center">
            <Column columns={{ xs: 14, sm: 7, md: 5 }} offsets={{ sm: 1 }}>
              <div className={styles.accordion}>
                <motion.div className={styles.items}>
                  {fields.map((data, index) => (
                    <Item
                      key={`item-${index}`}
                      isExpanded={`item-${index}` === expanded}
                      expandItem={() => setExpanded(`item-${index}`)}
                      data={data}
                    />
                  ))}
                </motion.div>
              </div>
            </Column>
            <Column columns={{ xs: 14, sm: 7, md: 7 }} offsets={{ sm: 1 }}>
              <img
                src={primary.image.xxl.url}
                alt={primary.image.alt}
                className={styles.image}
              />
            </Column>
          </Row>
        </Container>
      </Section>
    </div>
  );
}
