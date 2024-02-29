//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//const cors = require("cors");


//app.use(cors());

const mockUsers = [
  { id: 1, username: 'TBryant44', displayName: "Tyler Bryant" },
  { id: 2, username: 'MAnderson23', displayName: "Megan Anderson" },
  { id: 3, username: 'JSmith12', displayName: "John Smith" },
  { id: 4, username: 'LJohnson14', displayName: "Laura Johnson" },
  { id: 5, username: 'RWilliams34', displayName: "Robert Williams" },
  { id: 6, username: 'JMiller22', displayName: "Jessica Miller" },
  { id: 7, username: 'TAnderson11', displayName: "Thomas Anderson" },
  { id: 8, username: 'MMoore33', displayName: "Michelle Moore" },
  { id: 9, username: 'JTaylor21', displayName: "James Taylor" },
  { id: 10, username: 'LJackson32', displayName: "Linda Jackson" }
];

app.get("/", (request, response) => {
  response.send({ message: "Hello from the server!" });
});

// Define a GET route for '/api/users'
app.get('/api/users', (request, response) => {
  // Log the query parameters from the request
  console.log(request.query);

  // Destructure 'filter' and 'value' from the query parameters
  const { query: { filter, value } } = request;
  
  // If 'filter' and 'value' are provided, return a filtered list of users
  if (filter && value) return response.send(
    mockUsers.filter((user) => user[filter].includes(value))
  );

  // If 'filter' and 'value' are not provided, return all users
  return response.send(mockUsers);
});

// Define a GET route for '/api/users/:id'
app.get('/api/users/:id', (request, response) => {
    // Parse the 'id' parameter from the request
    const parsedId = parseInt(request.params.id);
    console.log("🚀 ~ file: index.js:26 ~ app.get ~ parsedId:", parsedId)

    // If the parsed 'id' is not a number, return a 400 status code with a message
    if(isNaN(parsedId)) {
        return response.status(400).send({ message: "Invalid ID supplied" });
    }

    // Find the user with the parsed 'id' in the 'mockUsers' array
    const findUser = mockUsers.find((user) => user.id === parsedId);

    // If no user is found, return a 404 status code
    if (!findUser) return response.sendStatus(404);

    // If a user is found, send the user as the response
    response.send(findUser);
});

app.get('/api/products', (request, response) => {
  response.send([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
