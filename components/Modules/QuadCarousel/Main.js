import SwiperCore, { Controller, Pagination, EffectFade  } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Picture from "../../Picture"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller, Pagination, EffectFade ]);

export default function Main({
  fields,
  controlledSwiper,
  setActive,
}) {

  const params = {
    resizeevent: 'auto',
    
  }

  return (
    <div className={["swiper-main", styles.mainSwiper].join(" ")}>
      <Swiper
        {...params}
        slidesPerView={1}
        effect='fade'
        fadeEffect= {{
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
              <Picture image={item.image} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}