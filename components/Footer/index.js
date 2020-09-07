import Link from "next/link";
import { Container, Row, Column } from "../Grid";

import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.secondary}>
          <Row>
            <Column columns={{ xs: 14, md: 2 }}>
              <Link href="/">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.393"
                    height="22.393"
                  >
                    <path
                      data-name="Path 40"
                      d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z"
                    />
                    <path
                      data-name="Path 41"
                      d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126"
                    />
                  </svg>
                </a>
              </Link>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>
              <ul>
                <li>
                  <Link href="#">
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Contact Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Shipping Info</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Track Your Order</a>
                  </Link>
                </li>
              </ul>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>
              <ul>
                <li>
                  <Link href="#">
                    <a>Financing Info</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Warranty</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Support</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>FAQ</a>
                  </Link>
                </li>
              </ul>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>
              <ul>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
              </ul>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>Email signup</Column>
          </Row>
        </div>

        <div className={styles.tertiary}>
          <Row>
            <Column columns={{ xs: 2 }}>
              <p>©2020 COR LLC</p>
            </Column>
            <Column columns={{ xs: 1 }}>
              <Link href="#">
                <a>Legal</a>
              </Link>
            </Column>
            <Column columns={{ xs: 1 }}>
              <Link href="#">
                <a>Privacy</a>
              </Link>
            </Column>
            <Column columns={{ xs: 1 }}>
              <Link href="#">
                <a>Cookies</a>
              </Link>
            </Column>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
