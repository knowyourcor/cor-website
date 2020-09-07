import { Container, Row, Column } from "../Grid";
import Logo from "../Logo";

import styles from "./topbar.module.scss";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <Container>
        <Row>
          <Column columns={{ xs: 14 }}>
            <Logo />
          </Column>
        </Row>
      </Container>
    </div>
  );
};

export default Topbar;
