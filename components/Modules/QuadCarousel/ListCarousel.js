import { RichText } from "prismic-reactjs";
import SwiperCore, { Controller, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller, Pagination]);

export default function ListCarousel({
  fields,
  controlledSwiperOne,
  setControlledSwiper
}) {
  return (
    <div className={["swiper-controller c-card", styles.card, styles.toDoWrap].join(" ")}>
      <Swiper
        pagination={{ clickable: true }}
        onSwiper={setControlledSwiper}
        controller={{ control: controlledSwiperOne }}
      >
        {fields.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <RichText render={data.heading} />
              <p>Complete the items in order each day</p>
              <ul>
                {data.list.map((list, j) => {
                  return (
                    <li key={j} >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <g transform="translate(-1228 -6342)">
                          <circle cx="20" cy="20" r="20" fill="#6fda8c" transform="translate(1228 6342)" />
                          <g>
                            <path fill="#23a046" d="M1499.759 458.341a1.49 1.49 0 0 1-1.138-.528l-4.391-5.187a1.491 1.491 0 1 1 2.276-1.926l3.148 3.719 5.675-8.01a1.491 1.491 0 1 1 2.433 1.724l-6.787 9.579a1.491 1.491 0 0 1-1.152.628z" transform="translate(-252.957 5909.939)" />
                          </g>
                        </g>
                      </svg>
                      {list.text}
                    </li>
                  )
                })}
              </ul>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div >
  )
}