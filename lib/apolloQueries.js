import { gql } from "@apollo/client";

const LinkFragment = gql`
  fragment LinkFragment on MenuMenu_links {
    link {
      _linkType
      ... on _ExternalLink {
        url
      }
      ... on _FileLink {
        name
        url
        size
      }
      ... on _Document {
        _meta {
          uid
        }
      }
      ... on Page {
        _meta {
          uid
        }
      }
      ... on Homepage {
        _meta {
          uid
        }
      }
      ... on Shop {
        _meta {
          uid
        }
      }
    }
    label
  }
`;

export const MENU_QUERY = gql`
  query MenuDataByUid($uid: String!) {
    allMenus(uid: $uid) {
      edges {
        node {
          menu_links {
            ...LinkFragment
          }
        }
      }
    }
  }
  ${LinkFragment}
`;

export const HOMEPAGE_QUERY = gql`
  query {
    allHomepages(uid: "homepage") {
      edges {
        node {
          meta_title
          meta_description
          page_title
          _linkType
          body {
            ... on HomepageBodyFull_width_image {
              type
              primary {
                image
                headline
                link {
                  _linkType
                  ... on _Document {
                    _meta {
                      uid
                      type
                    }
                  }
                }
                link_label
              }
            }
            ... on HomepageBodyText_image {
              type
              primary {
                headline
                text
                image
                background_color
                alignment
                overlap_text_and_image
              }
            }
            ... on HomepageBodyTabs {
              type
              fields {
                image
                tab_name
                text
              }
            }
            ... on HomepageBodyAccordion {
              type
              primary {
                headline
                image
                background_color
              }
              fields {
                title
                text
              }
            }
            ... on HomepageBodyProfiles {
              type
              primary {
                headline
              }
              fields {
                image
                tab_name
                profile_name
                profile_description
                profile_text
                blood_speed
                blood_clarity
                blood_resilience
                blood_fitness
                blood_hydration
                profile_type
                profile_score
              }
            }
            ... on HomepageBodyQuote {
              type
              primary {
                quote
                author_name
                author_portrait
              }
            }
            ... on HomepageBodyCarousel {
              type
              primary {
                headline
                text
              }
              fields {
                image
                headline
                text
              }
            }
            ... on HomepageBodyHero_carousel {
              type
              primary {
                background_color
                link {
                  _linkType
                  ... on _Document {
                    _meta {
                      uid
                      type
                    }
                  }
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
                link_label
              }
              fields {
                image
                headline
                number
                video_source
              }
            }
          }
        }
      }
    }
  }
`;
