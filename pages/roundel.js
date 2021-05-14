import React, { useState } from "react";
import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Roundel from "../components/Roundel";

import { getMenuData } from "../lib/api";

// Set the roundel position
// rotate: -360 to 360
// size: 0 to 36
const position = [
  {
    red: {
      rotate: 320,
      size: 5,
    },
    green: {
      rotate: 90,
      size: 12,
    },
    blue: {
      rotate: 354,
      size: 10,
    },
    teal: {
      rotate: -150,
      size: 5,
    },
  },
  {
    red: {
      rotate: 40,
      size: 6,
    },
    green: {
      rotate: 210,
      size: 18,
    },
    blue: {
      rotate: -102,
      size: 8,
    },
    teal: {
      rotate: 200,
      size: 9,
    },
  },
  {
    red: {
      rotate: 250,
      size: 8,
    },
    green: {
      rotate: 80,
      size: 19,
    },
    blue: {
      rotate: 260,
      size: 13,
    },
    teal: {
      rotate: 20,
      size: 4,
    },
  },
];

export default function Index() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Head />
      <div onClick={() => setIndex(index + 1)}>
        <Roundel index={index} />
      </div>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}

Index.getLayout = getLayout;
