import { GraphQLClient } from "graphql-request";

const CATALOGUE_API_URL = `https://api.crystallize.com/tsvetochki-test/catalogue`;

export const catalogueClient = new GraphQLClient(CATALOGUE_API_URL);

// Service API
// https://crystallize.com/learn/open-source/boilerplates/service-api
export const serviceAPIClient = new GraphQLClient(
    `https://remix-service-api.vercel.app/api/graphql`,
    {
      credentials: "include",
      mode: "cors",
    }
  );