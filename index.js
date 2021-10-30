const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

// DBConnection
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DBConnection Successful'))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {});

// PARSE JSON BODY DATA
app.use(express.json());

// CORS
app.use(cors());

// ENDPOINTS
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});
