import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Item from "./Item";
import Content from "./Content";

import styles from "./tabs.module.scss";

export default function Tabs({ primary, fields }) {
  const [isOpen, setIsOpen] = useState("tab-0");

  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <div className={styles.tabs}>
          <Row align="center">
            <Column columns={{ xs: 14 }}>
              <motion.ul layout className={styles.labels}>
                {fields.map((item, index) => (
                  <Item
                    key={`tab-${index}`}
                    isOpen={`tab-${index}` === isOpen}
                    label={item.tab_name[0].text}
                    openTab={() => setIsOpen(`tab-${index}`)}
                  />
                ))}
              </motion.ul>
            </Column>
          </Row>
          <div className={styles.tabsContainer}>
            {fields.map((item, index) => (
              <AnimatePresence exitBeforeEnter key={`tab-${index}`}>
                {`tab-${index}` === isOpen && <Content {...item} />}
              </AnimatePresence>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
