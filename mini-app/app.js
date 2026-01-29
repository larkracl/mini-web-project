const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('<h1>Success! Dockerized Mini Web Server is Running!</h1>');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
