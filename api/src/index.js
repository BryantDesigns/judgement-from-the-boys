//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


app.use(cors());

app.get("/", (request, response) => {
  response.status(201).send({ message: "Hello from the server!" });
});

app.get('/api/users', (request, response) => {
  response.status(200).send([
    { id: 1, username: 'TBryant44', displayName: "Tyler Bryant" },
    { id: 2, username: 'MAnderson23', displayName: "Megan Anderson" },
    { id: 3, username: 'JSmith12', displayName: "John Smith" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
