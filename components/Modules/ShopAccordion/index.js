import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Item from "./Item";

import styles from "./shopAccordion.module.scss";

export default function ShopAccordion({ primary, fields }) {
  const ImageBased = () => {
    const [expanded, setExpanded] = useState("item-0");

    const backgroundColor = primary.background_color
      ? primary.background_color
      : "transparent";

    return (
      <Section
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Container>
          <Row justify="center">
            <Column columns={{ xs: 14, sm: 10, md: 7, lg: 7 }}>
              {primary.image && (
                <Picture image={primary.image} className={styles.image} />
              )}
            </Column>
            <Column
              columns={{ xs: 14, md: 6, lg: 5 }}
              offsets={{ md: 1, lg: 1 }}
            >
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
  };
  const TextBased = () => {
    const [expanded, setExpanded] = useState(null);

    return (
      <Section
        style={{
          backgroundColor: primary.background_color
            ? primary.background_color
            : "transparent",
        }}
      >
        <Container>
          <Row>
            <Column
              columns={{ xs: 14, sm: 12, lg: 10 }}
              offsets={{ sm: 1, lg: 2 }}
            >
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
  };

  return primary.image ? <ImageBased /> : <TextBased />;
}
