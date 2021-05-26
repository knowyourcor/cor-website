import { PrismicLink } from "apollo-link-prismic";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allBlog_posts: relayStylePagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://thecor.prismic.io/graphql",
  }),
  cache: cache,
});

export default client;
