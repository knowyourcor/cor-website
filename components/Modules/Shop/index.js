import { useState } from "react";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container } from "../../Grid";
import Item from "./Item";
import Panel from "./Panel";

import styles from "./shop.module.scss";

export default function Shop({ fields }) {
  const [isOpen, setIsOpen] = useState("tab-0");

  return (
    <Section align="center">
      <Container>
        <div className={styles.shop}>
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
