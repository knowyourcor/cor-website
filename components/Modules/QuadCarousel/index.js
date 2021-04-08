import React, { useState } from 'react'
import SwiperCore, { Controller } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion, AnimatePresence } from "framer-motion";

import Section from "../../Section"
import { Container } from "../../Grid"
import Image from "../../Image"
import RoundelMeter from "../../RoundelMeter"

import styles from "./index.module.scss"

// install Swiper's Controller component
SwiperCore.use([Controller]);

const fields = [
  {
    image: "/images/index/home-image1.jpg",
    name: "Robert’s Results",
    number: "+3",
    heading: "Okinawa Essentials",
    todo: [
      { task: "10-Minutes Rajio Taiso" },
      { task: "5 Cups Green Tea" },
      { task: "1 Sweet Potato" },
      { task: "1 Dried Kombu Seaweed Sheet" },
      { task: "1 Serving Fish" },
      { task: "15-Minute Check-In" },
      { task: "10,0000 Steps" },
    ]
  },
  {
    image: "/images/index/home-image2.jpg",
    name: "Rebecca’s Results",
    number: "-36",
    heading: "Essentials",
    todo: [
      { task: "10-Minutes Rajio Taiso" },
      { task: "5 Cups Green Tea" },
      { task: "1 Sweet Potato" },
      { task: "1 Dried Kombu Seaweed Sheet" },
      { task: "1 Serving Fish" },
      { task: "15-Minute Check-In" },
      { task: "10,0000 Steps" },
    ]
  }
]

const params = {
  resizeevent: 'auto',
}

export default function QuadCarousel() {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [controlledSwiperOne, setControlledSwiperOne] = useState(null);
  const [controlledSwiperTwo, setControlledSwiperTwo] = useState(null);

  return (
    <Section className={["dual-carousel", styles.dualCarousel].join(" ")} align="center">
      <Container>
        <div className={styles.headingWrap}>
          <h2>Your health unlocked</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
        </div>
        <div className={styles.swiperWrap}>
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
                      <h5>{item.name}</h5>
                      <p>Today’s Program Results</p>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className={["c-card", styles.card, styles.meterWrap].join(" ")}>
              <Swiper
                {...params}
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
          </div>
          <div className={["swiper-main", styles.mainSwiper].join(" ")}>
            <Swiper
              {...params}
              controller={{ control: controlledSwiper }}
              slidesPerView={1}
              pagination={true}
            >
              {fields.map((item, i) => {
                return (
                  <SwiperSlide className="swiperSlide" key={i}>
                    <Image image={item.image} width={903} height={764} />
                    {/* <div className={["c-card", styles.cDetails].join(" ")}>
                      <h5>{data.name}</h5>
                    </div> */}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className={["swiper-controller c-card", styles.card, styles.toDoWrap].join(" ")}>
            <Swiper
              {...params}
              onSwiper={setControlledSwiper}
              controller={{ control: controlledSwiperOne }}
              speed="800"
              noSwiping={false}
            >
              {fields.map((data, i) => {
                return (
                  <SwiperSlide key={i}>
                    <h3>{data.heading}</h3>
                    <p>Complete the items in order each day</p>
                    <ul>
                      {data.todo.map((todos, j) => (
                        <li key={j}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <g transform="translate(-1228 -6342)">
                              <circle cx="20" cy="20" r="20" fill="#6fda8c" transform="translate(1228 6342)" />
                              <g>
                                <path fill="#23a046" d="M1499.759 458.341a1.49 1.49 0 0 1-1.138-.528l-4.391-5.187a1.491 1.491 0 1 1 2.276-1.926l3.148 3.719 5.675-8.01a1.491 1.491 0 1 1 2.433 1.724l-6.787 9.579a1.491 1.491 0 0 1-1.152.628z" transform="translate(-252.957 5909.939)" />
                              </g>
                            </g>
                          </svg>
                          {todos.task}
                        </li>
                      ))}
                    </ul>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </Container>
    </Section>
  )
}