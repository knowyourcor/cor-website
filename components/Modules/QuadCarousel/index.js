import React, { useState } from 'react'
import { RichText } from "prismic-reactjs";

import Section from "../../Section"
import { Container } from "../../Grid"
import Main from "./Main"
import Details from "./Details"
import List from "./List"

import styles from "./index.module.scss"

export default function QuadCarousel({ primary, fields }) {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [controlledSwiperOne, setControlledSwiperOne] = useState(null);
  const [controlledSwiperTwo, setControlledSwiperTwo] = useState(null);
  const [active, setActive] = useState("item-0")

  const parentVariant = {
    open: {
      transition: { staggerChildren: 0.10, delayChildren: 0.25 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };


  const childVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -200 },
      },
    },
    closed: {
      y: -50,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  }

  return (
    <Section className={styles.quadCarousel} align="center" style={{ backgroundColor: primary.background_color }}>
      <Container>
        <div className={styles.headingWrap}>
          <RichText render={primary.heading} />
          <RichText render={primary.paragraph} />
        </div>
        <div className={styles.swiperWrap}>
          <Details
            fields={fields}
            controlledSwiperTwo={controlledSwiperTwo}
            setControlledSwiperOne={setControlledSwiperOne}
            setControlledSwiperTwo={setControlledSwiperTwo}
            parentVariant={parentVariant}
            childVariants={childVariants}
            active={active}
          />
          <Main
            fields={fields}
            controlledSwiper={controlledSwiper}
            setActive={setActive}
          />
          <List
            fields={fields}
            controlledSwiperOne={controlledSwiperOne}
            setControlledSwiper={setControlledSwiper}
            parentVariant={parentVariant}
            childVariants={childVariants}
            active={active}
          />
        </div>
      </Container>
    </Section>
  )
}