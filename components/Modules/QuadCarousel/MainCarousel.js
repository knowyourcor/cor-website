import SwiperCore, { Controller, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Picture from "../../Picture"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller, Pagination]);

export default function MainCarousel({
  fields,
  controlledSwiper
}) {

  const params = {
    resizeevent: 'auto',
  }

  return (
    <div className={["swiper-main", styles.mainSwiper].join(" ")}>
      <Swiper
        {...params}
        slidesPerView={1}
        pagination={{ clickable: true }}
        controller={{ control: controlledSwiper }}
      >
        {fields.map((item, i) => {
          return (
            <SwiperSlide className="swiperSlide" key={i}>
              <Picture image={item.image} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}