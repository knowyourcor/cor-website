import { RichText } from "prismic-reactjs";
import SwiperCore, { Controller } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import RoundelMeter from "../../RoundelMeter"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller]);

export default function DetailsCarousel({
  fields,
  controlledSwiperTwo,
  setControlledSwiperOne,
  setControlledSwiperTwo
}) {

  const params = {
    resizeevent: 'auto'
  }

  return (
    <div className={["swiper-details", styles.detailsWrap].join(" ")}>
      <div className={["c-card", styles.card, styles.nameWrap].join(" ")}>
        <Swiper
          {...params}
          onSwiper={setControlledSwiperOne}
          controller={{ control: controlledSwiperTwo }}
        >
          {fields.map((item, i) => {
            return (
              <SwiperSlide key={i} className={styles.cDetails}>
                <RichText render={item.name} />
                <p>Today’s Program Results</p>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className={["c-card", styles.card, styles.meterWrap].join(" ")}>
        <Swiper
          onSwiper={setControlledSwiperTwo}
        >
          {fields.map((item, i) => {
            return (
              <SwiperSlide key={i} className={styles.swiperSlide}>
                <RoundelMeter className="roundelMeterWrap" score={item.number} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div >
  )
}