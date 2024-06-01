'use client'
import { QueryClient, QueryClientProvider as QueryClient_provider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const query_client = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClient_provider client={query_client}>
      {children}
    </QueryClient_provider>
  )
}


export default QueryClientProvider
