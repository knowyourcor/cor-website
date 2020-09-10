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
                  <Link href="/[slug]" as="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/shipping-info">
                    <a>Shipping Info</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/track-order">
                    <a>Track Order</a>
                  </Link>
                </li>
              </ul>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>
              <ul>
                <li>
                  <Link href="/[slug]" as="/financing-info">
                    <a>Financing Info</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/warranty">
                    <a>Warranty</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/support">
                    <a>Support</a>
                  </Link>
                </li>
                <li>
                  <Link href="/[slug]" as="/faq">
                    <a>FAQ</a>
                  </Link>
                </li>
              </ul>
            </Column>

            <Column columns={{ xs: 14, md: 3 }}>
              <ul>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
              <Link href="/[slug]" as="/legal">
                <a>Legal</a>
              </Link>
            </Column>
            <Column columns={{ xs: 1 }}>
              <Link href="/[slug]" as="/privacy">
                <a>Privacy</a>
              </Link>
            </Column>
            <Column columns={{ xs: 1 }}>
              <Link href="/[slug]" as="/cookies">
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
