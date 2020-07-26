const fetch = require("node-fetch");
require("dotenv").config();

const FAUNA_ACCESS_TOKEN = process.env.FAUNA_ACCESS_TOKEN;

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
    fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${FAUNA_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.text())
      .then((body) => body)
      .catch(() => reject("Failed to fetch query results"));
  });

exports.handler = async (event) => {
  const body = await fauna();

  return {
    statusCode: 200,
    body,
  };
};
