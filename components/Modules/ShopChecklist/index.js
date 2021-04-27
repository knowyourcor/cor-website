import { RichText } from "prismic-reactjs";

import Section from "../../Section"
import { Row, Column } from "../../Grid"
import Picture from "../../Picture"

import styles from "./index.module.scss"

export default function Checklist({ primary, fields }) {
  return (
    <Section className={styles.checklistWrap} backgroundColor={primary.background_color}>
      <Row align="center">
        <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }} justify="center">
          <RichText render={primary.heading} />
          <RichText render={primary.text} />
          <div className={styles.listHolder}>
            <ul>
              {fields.map((item, i) => (
                <li key={i} className={styles.card}>
                  <img src={item.icon.url} />
                  <RichText render={item.item} />
                </li>
              ))}
            </ul>
          </div>
        </Column>
        <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 1 }} className={styles.cColumn}>
          <Picture image={primary.image} />
        </Column>
      </Row>
    </Section>
  )
}