import { ApolloClient } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { InMemoryCache } from "apollo-cache-inmemory"
import { PrismicLink } from "apollo-link-prismic";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://thecor.prismic.io/graphql",
  }),
  cache
});

export default client;
