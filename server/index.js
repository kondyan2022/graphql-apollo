const express = require("express");
const cors = require("cors");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");
const schema = require("./schema");

const users = [
  { id: 1, username: "John Week", age: 45 },
  { id: 2, username: "Nastya", age: 40 },
];

const app = express();
app.use(cors());

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const id = Date.now();
    const user = { id, ...input };
    users.push(user);
    return user;
  },
};
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
