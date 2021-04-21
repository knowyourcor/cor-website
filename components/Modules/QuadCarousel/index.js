import React, { useState } from 'react'
import { RichText } from "prismic-reactjs";
import SwiperCore, { Controller, Pagination, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from "framer-motion"

import Section from "../../Section"
import { Container } from "../../Grid"
import Picture from "../../Picture"
import RoundelMeter from "../../RoundelMeter"

import styles from "./index.module.scss"

SwiperCore.use([Controller, Pagination, EffectFade]);

const MainPhoto = ({ image, index, active }) => {
  const variantsPhoto = {
    open: {
      opacity: 1,
      transition: { delay: .25 }
    },
    closed: {
      opacity: 0,
      transition: { delay: .15 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={`item-${index}` === active ? "open" : "closed"}
      variants={variantsPhoto}
    >
      <Picture image={image} />
    </motion.div>
  )
}

const DetailsName = ({ name, index, active, parentVariant, childVariants }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={`item-${index}` === active ? "open" : "closed"}
    transition={{ staggerChildren: 0.2, delayChildren: 0.15 }}
    variants={parentVariant}
  >
    <motion.div variants={childVariants}>
      <RichText render={name} />
    </motion.div>
    <motion.div variants={childVariants}>
      <p>Today’s Program Results</p>
    </motion.div>
  </motion.div>
)

const List = ({ heading, list, index, active, parentVariant, childVariants }) => (
  <motion.div
    className={styles.listContent}
    initial={{ opacity: 1 }}
    animate={`item-${index}` === active ? "open" : "closed"}
    transition={{ staggerChildren: 0.2, delayChildren: 0.15 }}
    variants={parentVariant}
  >
    <motion.div variants={childVariants}>
      <RichText render={heading} />
    </motion.div>
    <motion.div variants={childVariants}>
      <p>Complete the items in order each day</p>
    </motion.div>
    <motion.ul
      animate={`item-${index}` === active ? "open" : "closed"}
      transition={{ staggerChildren: 0.2, delayChildren: 0.15 }}
      variants={parentVariant}
    >
      {list.map((list, j) => {
        return (
          <motion.li key={j} variants={childVariants} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <g transform="translate(-1228 -6342)">
                <circle cx="20" cy="20" r="20" fill="#6fda8c" transform="translate(1228 6342)" />
                <g>
                  <path fill="#23a046" d="M1499.759 458.341a1.49 1.49 0 0 1-1.138-.528l-4.391-5.187a1.491 1.491 0 1 1 2.276-1.926l3.148 3.719 5.675-8.01a1.491 1.491 0 1 1 2.433 1.724l-6.787 9.579a1.491 1.491 0 0 1-1.152.628z" transform="translate(-252.957 5909.939)" />
                </g>
              </g>
            </svg>
            {list.text}
          </motion.li>
        )
      })}
    </motion.ul>
  </motion.div>
)

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

  const params = {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    resizeObserver: true,
  }

  return (
    <Section className={styles.quadCarousel} align="center" style={{ backgroundColor: primary.background_color }}>
      <Container>
        <div className={styles.headingWrap}>
          <RichText render={primary.heading} />
          <RichText render={primary.paragraph} />
        </div>
        <div className={styles.swiperWrap}>
          <div className={styles.detailsWrap}>
            <div className={[styles.card, styles.nameWrap].join(" ")}>
              <Swiper
                {...params}
                onSwiper={setControlledSwiperOne}
                controller={{ control: controlledSwiperTwo }}
              >
                {fields.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className={styles.cDetails}>
                      <DetailsName
                        {...item}
                        index={i}
                        active={active}
                        parentVariant={parentVariant}
                        childVariants={childVariants}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className={[styles.card, styles.meterWrap].join(" ")}>
              <Swiper
                {...params}
                onSwiper={setControlledSwiperTwo}
              >
                {fields.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className={styles.swiperSlide}>
                      {`item-${i}` === active &&
                        <RoundelMeter className="roundelMeterWrap" score={item.meter_number} />
                      }
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
          <div className={styles.mainSwiper}>
            <Swiper
              {...params}
              slidesPerView={1}
              pagination={{ clickable: true }}
              controller={{ control: controlledSwiper }}
              onSlideChange={(swiper) => {
                setActive(`item-${swiper.activeIndex}`)
              }}
            >
              {fields.map((item, i) => {
                return (
                  <SwiperSlide className="swiperSlide" key={i}>
                    <MainPhoto
                      {...item}
                      index={i}
                      active={active}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className={styles.listWrap}>
            <Swiper
              {...params}
              pagination={{ clickable: true }}
              onSwiper={setControlledSwiper}
              controller={{ control: controlledSwiperOne }}
              onSlideChange={(swiper) => {
                setActive(`item-${swiper.activeIndex}`)
              }}
            >
              {fields.map((data, i) => {
                return (
                  <SwiperSlide key={i}>
                    <List
                      {...data}
                      index={i}
                      active={active}
                      parentVariant={parentVariant}
                      childVariants={childVariants}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div >
        </div>
      </Container>
    </Section>
  )
}