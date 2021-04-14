import SwiperCore, { Controller, Pagination, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from "framer-motion"

import Picture from "../../Picture"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller, Pagination, EffectFade]);

export default function Main({
  fields,
  controlledSwiper,
  active,
  setActive,
}) {

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -200 },
      }
    },
    closed: {
      x: 0,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <div className={styles.mainSwiper}>
      <Swiper
        resizeevent='auto'
        slidesPerView={1}
        effect='fade'
        fadeEffect={{
          crossFade: true
        }}
        pagination={{ clickable: true }}
        controller={{ control: controlledSwiper }}
        onSlideChange={(swiper) => {
          setActive(`item-${swiper.activeIndex}`)
        }}
      >
        {fields.map((item, i) => {
          return (
            <SwiperSlide className="swiperSlide" key={i}>
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={`item-${i}` === active ? "open" : "closed"}
                variants={variants}
              >
                <Picture image={item.image} />
              </motion.div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}