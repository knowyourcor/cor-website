import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Item from "./Item";

import styles from "./accordion.module.scss";

export default function Accordion({ primary, fields }) {
  const [expanded, setExpanded] = useState("item-0");

  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <Row align="center">
          <Column columns={{ xs: 14, sm: 8, md: 7 }} offsets={{ sm: 1 }}>
            <RichText render={primary.headline} />
          </Column>
        </Row>

        <Row align="center">
          <Column columns={{ xs: 14, sm: 8, md: 7 }} offsets={{ sm: 1 }}>
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
        </Row>
      </Container>
    </Section>
  );
}
