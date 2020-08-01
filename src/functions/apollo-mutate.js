import fetch from "node-fetch";
import ApolloClient, { gql, useMutation } from "apollo-boost";
import "dotenv/config";

const FAUNA_ACCESS_TOKEN = process.env.FAUNA_ACCESS_TOKEN;

const URL = "https://graphql.fauna.com/graphql";

const mutation = gql`
  mutation CreateCustomer($data: CustomerInput!) {
    createCustomer(data: $data) {
      firstName
      lastName
    }
  }
`;

const variables = {
  data: {
    firstName: "Joe",
    lastName: "Dirt",
    address: {
      street: "87856 Mendota Court",
      city: "Idaho Falls",
      state: "ID",
      zipCode: "83405",
    },
    telephone: "208-346-0715",
    creditCard: {
      network: "Visa",
      number: "4556781272473393",
    },
  },
};

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
    const body = await client.mutate({
      mutation,
      variables,
    });

    console.log({ body });

    return {
      statusCode: 200,
      body: `${JSON.stringify(body)}`,
    };
  } catch (error) {
    console.log({ error });
  }
}
