// import express
const express = require('express');
// import the routes
const router = require('../routes/router');
const api = require('../routes/api');
const PORT = process.env.PORT || 3001;

// new instance for express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(router);
app.use(api);

// starts the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});