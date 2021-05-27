import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./textAccordion.module.scss";

export default function TextAccordion({ primary, fields }) {
  const expandFirstItem = primary.expand_first_item ? "item-0" : null;
  const [expanded, setExpanded] = useState(expandFirstItem);

  return (
    <Section
      style={{
        backgroundColor: primary.background_color
          ? primary.background_color
          : "transparent",
      }}
    >
      <Container>
        <Row justify={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 12, lg: 8 }}>
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
    </Section>
  );
}
