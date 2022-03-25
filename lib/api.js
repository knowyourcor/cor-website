import Prismic from "@prismicio/client";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

function removeWhitespace(query) {
  return query
    ?.replace(/#.*\n/g, "")
    .replace(/[\s|,]*\n+[\s|,]*/g, " ")
    .replace(/:\s/g, ":")
    .replace(/,\s/g, ",")
    .replace(/\)\s\{/g, "){")
    .replace(/\}\s/g, "}")
    .replace(/\{\s/g, "{")
    .replace(/\s\}/g, "}")
    .replace(/\s\{/g, "{")
    .replace(/\)\s/g, ")")
    .replace(/\(\s/g, "(")
    .replace(/\s\)/g, ")")
    .replace(/\s\(/g, "(")
    .replace(/=\s/g, "=")
    .replace(/\s=/g, "=")
    .replace(/@\s/g, "@")
    .replace(/\s@/g, "@")
    .replace(/\s\$/g, "$")
    .replace(/\s\./g, ".")
    .trim();
}

async function fetchAPI(query, { previewData, variables } = {}) {
  try {
    const prismicAPI = await PrismicClient.getApi();
    const res = await fetch(
      `${GRAPHQL_API_URL}?query=${removeWhitespace(
        query
      )}&variables=${JSON.stringify(variables)}`,
      {
        headers: {
          "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
          "Content-Type": "application/json",
          "Accept-Language": API_LOCALE,
          Authorization: `Token ${API_TOKEN}`,
        },
      }
    );

    const json = await res.json();
    if (res.status !== 200 || json.errors) throw new Error(json.errors);

    return json.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMenuData(uid, previewData) {
  const data = await fetchAPI(
    `
    query MenuDataByUid($uid: String!) {
      allMenus(uid: $uid) {
        edges {
          node {
            menu_links {
              ...LinkFragment
            }
            call_to_actions_menu_links {
              label
              link {
                _linkType
                ... on _ExternalLink {
                  url
                  target
                }
                ... on _FileLink {
                  name
                  url
                  size
                }
                ... on _Document {
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
            call_to_action_link {
              _linkType
              ... on _ExternalLink {
                url
                target
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                  type
                }
              }
            }
            call_to_action_label
          }
        }
      }
    }
    
    fragment LinkFragment on MenuMenu_links {
      link {
        _linkType
        ... on _ExternalLink {
          url
          target
        }
        ... on _FileLink {
          name
          url
          size
        }
        ... on _Document {
          _meta {
            uid
            type
          }
        }
      }
      label
    }                
  `,
    {
      previewData,
      variables: {
        uid,
      },
    }
  );
  return data?.allMenus?.edges[0]?.node;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      allPages {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPages?.edges;
}

export async function getPageData(slug, previewData) {
  const data = await fetchAPI(
    `
    query PageDataBySlug($slug: String!) {
      allPages(uid: $slug) {
        edges {
          node {
            _meta {
              uid
            }
            meta_title
            meta_description
            meta_image
            page_title
            _linkType
            body {
              ... on PageBodyBody_text {
                type
                primary {
                  text
                }
              }
              ... on PageBodyBody_image {
                type
                primary {
                  image
                  caption
                }
              }
              ... on PageBodyText_description_image {
                type
                primary {
                  label
                  headline
                  image
                  description
                }
              }
              ... on PageBodyDual_grid {
                type
                primary {
                  image
                  headline
                  description
                }
              }
              ... on PageBodyTeam {
                type
                primary {
                  headline
                  text
                  background_color
                }
                fields {
                  name
                  job_title
                  description
                  image
                }
              }
              ... on PageBodyText___downloader {
                type
                primary {
                  background_color
                  headline
                  text
                  card_text
                  file_link {
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
                  card_disclaimer
                }
              }
              ... on PageBodyPdf_viewer {
                type
                primary {
                  pdf {
                    _linkType
                    ... on _FileLink {
                      name
                      url
                      size
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    {
      previewData,
      variables: {
        slug,
      },
    }
  );
  return data?.allPages?.edges[0]?.node;
}

export async function getHomepageData(previewData) {
  const data = await fetchAPI(
    `
    query {
      allHomepages(uid: "homepage") {
        edges {
          node {
            meta_title
            meta_description
            meta_image
            page_title
            _linkType
            body {
              ... on HomepageBodyFull_width_image {
                type
                primary {
                  image
                  video_source
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
              }
              ... on HomepageBodyText_image_hero {
                type
                primary {
                  text
                  image
                  background_color
                }
              }
              ... on HomepageBodyQuadcarousel {
                type
                primary {
                  headline
                  text
                  background_color
                }
                fields {
                  image
                  name
                  description
                  roundel_theme
                  meter_number
                  program_title
                  program_description
                  list
                }
              }
              ... on HomepageBodyNewsletter {
                type
                primary {
                  text
                  input_placeholder
                  button_label
                  mailchimp_url
                }
              }
              ... on HomepageBodyShop_accordion {
                type
                primary {
                  usid
                  headline
                  image
                  background_color
                }
                fields {
                  title
                  text
                  image
                }
              }
              ... on HomepageBodyVideo_accordion {
                type
                primary {
                  usid
                  headline
                  background_color
                }
                fields {
                  title
                  text
                  video_source
                }
              }
              ... on HomepageBodyText___background_image {
                type
                primary {
                  headline
                  image
                  text
                  background_color
                }
              }
              ... on HomepageBodyAccordion {
                type
                primary {
                  usid
                  text
                  image
                  background_color
                  bullet_style
                }
                fields {
                  title
                  text
                }
              }
              ... on HomepageBodyCarousel {
                type
                primary {
                  headline
                  text
                  text_alignment,
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
                  text
                }
              }
              ... on HomepageBodyHero_carousel {
                type
                primary {
                  background_color
                }
                fields {
                  variant
                  image
                  headline
                  video_source
                  link_label
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
                }
              }
              ... on HomepageBodyChecklist {
                type
                primary {
                  headline
                  image
                  text
                  program_name
                  program_description
                  background_color
                }
                fields {
                  checklist_item
                }
              }
              ... on HomepageBodyTeam {
                type
                primary {
                  headline
                  text
                  background_color
                }
                fields {
                  name
                  job_title
                  description
                  image
                }
              }
              ... on HomepageBodyText {
                type
                primary {
                  usid
                  text
                }
              }
              ... on HomepageBodyText_multi_plain_image {
                type
                primary {
                  text
                  background_color
                }
                fields {
                  image
                }
              }    
              ... on HomepageBodyText_multi_video {
                type
                primary {
                  text
                }
                fields {
                  video
                }
              }    
              __typename
            }
          }
        }
      }
    }      
  `,
    { previewData }
  );

  return data?.allHomepages?.edges[0]?.node;
}

export async function getShopData(previewData) {
  const data = await fetchAPI(
    `{
      allShops(uid: "shop") {
        edges {
          node {
            meta_title
            meta_description
            meta_image
            page_title
            body {
              ... on ShopBodyText {
                type
                primary {
                  text
                }
              }
              ... on ShopBodyShop_accordion {
                type
                primary {
                  usid
                  image
                  headline
                  background_color
                }
                fields {
                  image
                  title
                  text
                }
              }
              ... on ShopBodyText_accordion {
                type
                primary {
                  headline
                  background_color
                  expand_first_item
                }
                fields {
                  title
                  text
                }
              }
              ... on ShopBodyShop_text_image {
                type
                primary {
                  usid
                  headline
                  text
                  image
                  background_color
                  alignment
                }
              }
              ... on ShopBodyProduct {
                type
                primary {
                  image
                  screenshot
                  product_details
                  product_price_label
                  product_price
                  product_secondary_price
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
                  secondary_description
                }
              }
              ... on ShopBodyText___background_image {
                type
                primary {
                  headline
                  text
                  background_color
                  image
                }
              }
              ... on ShopBodyShop_checklist {
                type
                primary {
                  headline
                  text
                  image
                }
                fields {
                  icon
                  text
                }
              }
              ... on ShopBodyDualdatagrid {
                type
                primary {
                  background_color
                  tag
                  headline
                  text
                  image
                  screenshot
                }
              }
              ... on ShopBodyNewsletter {
                type
                primary {
                  text
                  input_placeholder
                  button_label
                }
              }
            }
          }
        }
      }
    }          
  `,
    { previewData }
  );

  return data?.allShops?.edges[0]?.node;
}

export async function getPressData(previewData) {
  const data = await fetchAPI(
    `{
      allPress_posts(sortBy:date_DESC) {
        edges {
          node {
            _meta {
              uid
            }
            cover_image
            title
            date
            publisher
            link {
              _linkType
              ... on _ExternalLink {
                url
                target
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                  type
                }
              }
            }
          }
        }
      }
    }`,
    {
      previewData,
    }
  );
  return data?.allPress_posts?.edges;
}

export async function getBlogData(previewData) {
  const data = await fetchAPI(
    `{
      allBlogs {
        edges {
          node {
            meta_title
            meta_description
            meta_image
            page_title
            pinned_blog_post {
              _linkType
              ... on Blog_post {
                _meta {
                  uid
                  tags
                }
                title
                date
                excerpt
                cover_image
              }
            }
          }
        }
      }
    }`,
    {
      previewData,
    }
  );
  return data?.allBlogs?.edges;
}

export async function getBlogPostTags() {
  const data = await fetchAPI(
    `{
      allBlog_posts {
        edges {
          node {
            _meta {
              tags
            }
          }
        }
      }
    }`
  );
  return data?.allBlog_posts?.edges;
}

export async function getBlogPostData(slug, previewData) {
  const data = await fetchAPI(
    `query PostBySlug($slug: String!) {
    allBlog_posts(uid: $slug) {
      edges {
        node {
          _meta {
            uid
            tags
          }
          meta_title
          meta_description
          meta_image
          cover_image
          title
          date
          theme
          body {
            ... on Blog_postBodyBlog_text {
              type
              primary {
                section_label
                text
              }
            }
            ... on Blog_postBodyBlog_image {
              type
              primary {
                image
                width
              }
            }
            ... on Blog_postBodyBlog_video {
              type
              primary {
                video
                width
              }
            }
            ... on Blog_postBodyBlog_quote {
              type
              primary {
                quote
                attribution
              }
            }
          }
        }
      }
    }
  }`,
    {
      previewData,
      variables: {
        slug,
      },
    }
  );

  return data?.allBlog_posts?.edges[0]?.node;
}
