const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const routes = {
  "/service1": "http://localhost:3001",
  "/service2": "http://localhost:3002",
};

app.get("/", (req, res) => {
  res.send("Home");
});
for (const route in routes) {
  try {
    const target = routes[route];
    app.use(route, createProxyMiddleware({ target }));
  } catch (e) {
    throw e;
  }
}

app.listen(3000, () => {
  console.log(` Port :- 3000`);
});
