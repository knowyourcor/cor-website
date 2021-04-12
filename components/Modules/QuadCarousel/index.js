import React, { useState } from 'react'
import SwiperCore, { Controller, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion, AnimatePresence } from "framer-motion";

import { RichText } from "prismic-reactjs";

import Section from "../../Section"
import { Container } from "../../Grid"
import Image from "../../Image"

import MainCarousel from "./MainCarousel"
import DetailsCarousel from "./DetailsCarousel"
import ListCarousel from "./ListCarousel"

import styles from "./index.module.scss"

export default function QuadCarousel({ primary, fields }) {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [controlledSwiperOne, setControlledSwiperOne] = useState(null);
  const [controlledSwiperTwo, setControlledSwiperTwo] = useState(null);

  return (
    <Section className={["quad-carousel", styles.quadCarousel].join(" ")} align="center" style={{ backgroundColor: primary.background_color }}>
      <Container>
        <div className={styles.headingWrap}>
          <RichText render={primary.heading} />
          <RichText render={primary.paragraph} />
        </div>
        <div className={styles.swiperWrap}>
          <DetailsCarousel
            fields={fields}
            controlledSwiperTwo={controlledSwiperTwo}
            setControlledSwiperOne={setControlledSwiperOne}
            setControlledSwiperTwo={setControlledSwiperTwo}
          />
          <MainCarousel
            fields={fields}
            controlledSwiper={controlledSwiper}
          />
          <ListCarousel
            fields={fields}
            controlledSwiperOne={controlledSwiperOne}
            setControlledSwiper={setControlledSwiper}
          />
        </div>
      </Container>
    </Section>
  )
}