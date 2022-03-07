import { ApolloProvider } from "@apollo/react-hooks";
import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { initializeApollo } from "./apollo.graphql";


const ApolloGlobalProvider: React.FC = ({ children }) => {
  const { state } = useAppContext();
  // this passes because initializeApollo comes from a .js file, ignore error
  const apolloClient = useMemo(() => initializeApollo(state.auth.access_token), [state.auth.access_token]);

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloGlobalProvider