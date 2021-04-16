// import { useState } from "react"
import { RichText } from "prismic-reactjs";

import Section from "../../Section"
import { Container, Row, Column } from "../../Grid"
import Picture from "../../Picture"

import styles from "./index.module.scss"

export default function Checklist({ primary, fields }) {
  return (
    <Section className={styles.checklistWrap} backgroundColor={primary.background_color}>
      <Container>
        <Row align="center">
          <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }} className="custom__column">
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
        </Row>
      </Container>
      <div className={styles.imageWrap}>
        <Picture image={primary.image} />
      </div>
    </Section>
  )
}