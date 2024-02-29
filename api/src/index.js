//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


app.use(cors());

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

const mockProducts = [
  { id: 1, name: 'Apple iPhone 13', price: 799, category: 'Electronics', description: '5.4-inch display, A15 Bionic chip, 5G capable' },
  { id: 2, name: 'Samsung Galaxy S21', price: 699, category: 'Electronics', description: '6.2-inch display, Exynos 2100, 5G capable' },
  { id: 3, name: 'Dell XPS 13', price: 999, category: 'Computers', description: '13.4-inch display, Intel i7, 16GB RAM, 512GB SSD' },
  { id: 4, name: 'Sony WH-1000XM4', price: 348, category: 'Audio', description: 'Over-ear headphones, Noise cancelling, 30 hours battery life' },
  { id: 5, name: 'Canon EOS M50 Mark II', price: 699, category: 'Cameras', description: '24.1MP, 4K video, Vlogging camera with flip screen' },
  { id: 6, name: 'Nintendo Switch', price: 299, category: 'Gaming', description: 'Portable gaming console, 6.2-inch display, Joy-Con controllers' },
  { id: 7, name: 'Instant Pot Duo', price: 89, category: 'Kitchen Appliances', description: '7-in-1 electric pressure cooker, 6 Quart' },
  { id: 8, name: 'Fitbit Charge 4', price: 129, category: 'Fitness', description: 'Fitness and health tracker, Heart rate monitor, GPS' },
  { id: 9, name: 'Kindle Paperwhite', price: 129, category: 'Reading', description: '6-inch display, Waterproof, 8GB storage' },
  { id: 10, name: 'Bose SoundLink Revolve', price: 179, category: 'Audio', description: 'Portable Bluetooth speaker, 360 sound, 12 hours play time' }
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
  response.send(mockProducts);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
