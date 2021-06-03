import { gql } from "@apollo/client";

export const ALL_BLOG_POSTS_QUERY = gql`
  query posts($after: String, $tag: [String!], $first: Int) {
    allBlog_posts(sortBy: date_DESC, tags: $tag, first: $first, after: $after) {
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

export const ALL_BLOG_POSTS_TAGS = gql`
  {
    allBlog_posts {
      edges {
        node {
          _meta {
            tags
          }
        }
      }
    }
  }
`;
