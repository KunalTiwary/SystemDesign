const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const User = require('./model/User');
const GPS = require('./model/GPS');
const authRoutes = require('./routes/auth');
const GPSRoutes = require('./routes/GPS');
var cors = require('cors')

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(GPSRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});


sequelize
  .sync()
  .then((result) => {
    app.listen(1111);
  })
  .catch((err) => console.log(err));
