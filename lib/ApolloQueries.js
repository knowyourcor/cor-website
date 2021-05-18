import { gql } from "@apollo/client";

export const ALL_BLOG_POSTS_QUERY = gql`
  query Posts($after: String) {
    allBlog_posts(first: 20, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _meta {
            uid
            tags
          }
          title
          date
          excerpt
          cover_image
        }
        cursor
      }
    }
  }
`;

export const ALL_BLOG_POSTS_UID = gql`
  {
    allBlog_posts {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
`;

export const BLOG_POST_QUERY = gql`
  query PostBySlug($slug: String!) {
    allBlog_posts(uid: $slug) {
      edges {
        node {
          _meta {
            uid
            tags
          }
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
              }
            }
            ... on Blog_postBodyBlog_video {
              type
              primary {
                video
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
  }
`;
