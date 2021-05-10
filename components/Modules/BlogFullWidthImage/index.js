import { RichText } from "prismic-reactjs";
import Picture from "../../Picture";

import styles from "./fullwidthimage.module.scss";

const Index = ({ primary }) => {
  return (
    <> {primary.image && <Picture image={primary.image} />} </>
  )
}

export default Index