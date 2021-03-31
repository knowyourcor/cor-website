import Layout from "../../components/Layout"
import FeaturedPress from "../../components/FeaturedPress"
import Hero from "./Hero"
import TextImage from "./TextImage"
import Team from "./Team"

import styles from "./about.module.scss"

export default function Index({
  preview
}) {
  return (
    <Layout
      classNameVal={styles.about}
      title="About Us"
      preview={preview}
    >
      <Hero />
      <TextImage />
      <Team />
      <FeaturedPress />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview
    },
    revalidate: 1, // In seconds
  };
}

