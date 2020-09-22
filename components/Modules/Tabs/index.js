import { useState } from "react";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Item from "./Item";
import Panel from "./Panel";

import styles from "./tabs.module.scss";

export default function Tabs({ fields }) {
  const [isOpen, setIsOpen] = useState("tab-0");

  return (
    <Section align="center">
      <Container>
        <div className={styles.tabs}>
          <Row align="center">
            <Column columns={{ xs: 14 }}>
              <motion.ul layout className={styles.tabLabels}>
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
          {fields.map(
            (item, index) =>
              `tab-${index}` === isOpen && (
                <Panel key={`tab-${index}`} {...item} />
              )
          )}
        </div>
      </Container>
    </Section>
  );
}
