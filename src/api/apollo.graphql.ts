import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { DefaultOptions } from "@apollo/react-hooks";
import { NormalizedCacheObject } from "apollo-boost";
import { useMemo } from "react";
import { AUTH_SETTOKEN } from "../reducers/authReducer";

// Exports ApolloClient instance, this makes it possible to query without Hooks 
// Comes in handy when you need to query outside of a Functional Component
export let apolloClient: ApolloClient<NormalizedCacheObject>;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

function createApolloClient(tkn: string | null | undefined) {
  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: "http://localhost:6543/graphql",
      headers: getAuthHeaders(tkn)
    }),
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions: defaultOptions
  });
}

const getAuthHeaders = (tkn: string | null | undefined) => {
  if (tkn) {
    return { "Authorization": `Bearer ${tkn}` }
  }
  else {
    return {};
  }
}



export function initializeApollo(tkn: string | null | undefined) {
  const _apolloClient = createApolloClient(tkn);

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo() {
  const tkn = localStorage.getItem(AUTH_SETTOKEN);
  const store = useMemo(() => initializeApollo(tkn), [tkn]);
  return store;
}