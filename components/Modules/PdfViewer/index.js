import dynamic from "next/dynamic";
import { Container, Row, Column } from "../../Grid";
import styles from "./pdfViewer.module.scss";

const Viewer = dynamic(() => import("./Viewer"), {
  ssr: false,
});

const PdfViewer = ({ primary }) => {
  return (
    <div className={styles.pdfViewer}>
      <Container>
        <Row>
          <Column columns={{ xs: 14 }}>
            <a
              className={styles.download}
              href={primary?.pdf?.url}
              target="_blank"
            >
              Download
            </a>
            <Viewer {...primary} />
          </Column>
        </Row>
      </Container>
    </div>
  );
};

export default PdfViewer;
