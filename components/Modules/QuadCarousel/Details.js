import { useState } from "react"
import { RichText } from "prismic-reactjs";
import SwiperCore, { Controller, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { motion } from "framer-motion"

import RoundelMeter from "../../RoundelMeter"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller, EffectFade]);

export default function Details({
  fields,
  active,
  controlledSwiperTwo,
  setControlledSwiperOne,
  setControlledSwiperTwo,
  parentVariant,
  childVariants
}) {

  const params = {
    resizeevent: 'auto'
  }

  return (
    <div className={styles.detailsWrap}>
      <div className={[styles.card, styles.nameWrap].join(" ")}>
        <Swiper
          {...params}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          onSwiper={setControlledSwiperOne}
          controller={{ control: controlledSwiperTwo }}
        >
          {fields.map((item, i) => {
            return (
              <SwiperSlide key={i} className={styles.cDetails}>
                <motion.div
                  animate={`item-${i}` === active ? "open" : "closed"}
                  transition={{ staggerChildren: 0.2, delayChildren: 0.15 }}
                  variants={parentVariant}
                >
                  <motion.div variants={childVariants}>
                    <RichText render={item.name} />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Today’s Program Results</p>
                  </motion.div>
                </motion.div>

              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className={[styles.card, styles.meterWrap].join(" ")}>
        <Swiper
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          onSwiper={setControlledSwiperTwo}
        >
          {fields.map((item, i) => {
            return (
              <SwiperSlide key={i} className={styles.swiperSlide}>
                {`item-${i}` === active &&
                  <RoundelMeter className="roundelMeterWrap" score={item.number} />
                }
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div >
  )
}