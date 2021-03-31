import { Container, Row, Column } from "../../../components/Grid";

export default function Index() {
  return (
    <Container>
      <h1>About COR</h1>
      <h2>We are on the offence of health</h2>
      <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
        <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
        </Column>
      </Row>
    </Container>
  )
}