import fetch from "node-fetch";

import "dotenv/config";

const FAUNA_ACCESS_TOKEN = process.env.FAUNA_ACCESS_TOKEN;

const URL = "https://graphql.fauna.com/graphql";

const query = `
query {
  allProducts {
    data {
      name
    }
  }
}`;

const fauna = () =>
  new Promise((resolve, reject) => {
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${FAUNA_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.text())
      .then((body) => resolve(body))
      .catch(() => reject("Failed to fetch query results"));
  });

export async function handler(event, context) {
  const body = await fauna();

  console.log({ body });

  return {
    statusCode: 200,
    body: `${body}`,
  };
}
