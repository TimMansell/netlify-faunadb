import fetch from "node-fetch";
import ApolloClient, { gql } from "apollo-boost";

import "dotenv/config";

const FAUNA_ACCESS_TOKEN = process.env.FAUNA_ACCESS_TOKEN;

const URL = "https://graphql.fauna.com/graphql";

const QUERY = gql`
  query {
    allProducts {
      data {
        name
      }
    }
  }
`;

const client = new ApolloClient({
  uri: URL,
  fetch,
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${FAUNA_ACCESS_TOKEN}`,
      },
    });
  },
});

export async function handler(event, context) {
  try {
    const body = await client.query({ query: QUERY });

    console.log({ body });

    return {
      statusCode: 200,
      body: `${JSON.stringify(body)}`,
    };
  } catch (error) {
    console.log({ error });
  }
}
