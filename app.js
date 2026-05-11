const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');

const requestRoutes = require('./routes/requestRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/requests', requestRoutes);

sequelize.sync()
  .then(() => {

    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  })
  .catch((err) => {
    console.log(err);
  });