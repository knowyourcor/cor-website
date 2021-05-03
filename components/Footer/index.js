import Link from "next/link";
import { Container, Row, Column } from "../Grid";
import EmailSignup from "../EmailSignup";

import styles from "./footer.module.scss";

const Footer = ({ footerMenuData, tertiaryMenuData }) => {
  // Divide array into chunks
  // @param {array} array to divide
  // @param {number} size to divide by
  function chunk(array, size) {
    const chunked_arr = [];
    let copied = [...array]; // ES6 destructuring
    const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
  }

  // All Link.web links to array
  const externalLinks = footerMenuData?.menu_links.filter(
    (item) => item.link._linkType === "Link.web"
  );

  // All Link.document links to array
  const internalLinks = footerMenuData?.menu_links.filter(
    (item) => item.link._linkType === "Link.document"
  );

  // Divide internalLinks array into two even arrays
  const internalLinksToColumn =
    internalLinks && chunk(internalLinks, Math.ceil(internalLinks?.length / 2));

  const WebLink = (link, index) => {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)?(?:\.[a-z]+)/;
    const domain = link.link?.url.match(regex)[1];
    return (
      <li key={`weblink-${index}`}>
        <a
          href={link.link?.url}
          title={link.label[0].text}
          target={link.link?.target}
          rel="noopener noreferrer"
        >
          <img
            src={`/icons/${domain.toLowerCase()}.svg`}
            alt={link.label[0].text}
          />
        </a>
      </li>
    );
  };

  const PageLink = (link, index) => {
    return (
      <li key={`${link.link?._meta?.uid}_${index}`}>
        <Link
          activeClassName={styles.active}
          href="/[slug]"
          as={`/${link.link?._meta?.uid}`}
        >
          <a>{link.label[0].text}</a>
        </Link>
      </li>
    );
  };
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.secondary}>
          <Row>
            <Column columns={{ xs: 14, md: 10 }}>
              <Row>
                <Column columns={{ xs: 14, md: 3 }}>
                  <Link href="/">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.393"
                        height="22.393"
                        className={styles.mark}
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
                {footerMenuData && (
                  <>
                    {internalLinksToColumn.map((set, index) => {
                      return (
                        <Column
                          columns={{ xs: 6, md: 3 }}
                          key={`menu-set-${index}`}
                        >
                          <ul>
                            {set.map((link, index) => {
                              return PageLink(link, index);
                            })}
                          </ul>
                        </Column>
                      );
                    })}
                  </>
                )}
              </Row>
            </Column>
            {footerMenuData && (
              <Column columns={{ xs: 14 }} justify="center" className={styles.socialhideMdup}>
                <ul className={styles.socialLinks}>
                  {externalLinks.map((link, index) => {
                    return WebLink(link, index);
                  })}
                </ul>
              </Column>
            )}
            <Column columns={{ xs: 14, md: 4 }}>
              <EmailSignup />
            </Column>
          </Row>
        </div>

        <div className={styles.tertiary}>
          <Row align="center">
            <Column columns={{ xs: 14, sm: 2 }} orders={{ xs: 1, sm: 1 }} justify="center">
              <p>©{new Date().getFullYear()} COR LLC</p>
            </Column>
            <Column columns={{ xs: 14, sm: 9, md: 10 }} orders={{ xs: 2, sm: 2 }} justify="center">
              <ul className={styles.tertiaryMenu}>
                {tertiaryMenuData && (
                  <>
                    {tertiaryMenuData?.menu_links.map((link, index) => {
                      return (
                        <li key={`${link.link?._meta?.uid}_${index}`}>
                          <Link
                            activeClassName={styles.active}
                            href="/[slug]"
                            as={`/${link.link?._meta?.uid}`}
                          >
                            <a>{link.label[0].text}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </Column>
            {footerMenuData && (
              <Column columns={{ xs: 14, sm: 2 }} orders={{ xs: 3, sm: 3 }} justify="center" className={styles.socialHideSmDown}>
                <ul className={styles.socialLinks}>
                  {externalLinks.map((link, index) => {
                    return WebLink(link, index);
                  })}
                </ul>
              </Column>
            )}
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
