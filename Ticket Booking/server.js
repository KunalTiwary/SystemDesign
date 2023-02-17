const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();

const User = require('./model/user');
const Role = require('./model/role');
const UserRole = require('./model/userRole');
const MovieRoutes = require('./routes/movies');
const Tickets = require('./model/tickets');
const Movies = require('./model/movies');
const TicketRoutes = require('./routes/tickets');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(MovieRoutes);
app.use(TicketRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});

User.belongsToMany(Role, { through: UserRole }); 

Role.belongsToMany(User, { through: UserRole });

User.belongsToMany(Movies, { through: Tickets }); 

Movies.belongsToMany(User, { through: Tickets });


sequelize
  .sync()
  .then((result) => {
    app.listen(1131);
  })
  .catch((err) => console.log(err));