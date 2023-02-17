const express = require('express');
const sequelize = require('./config/database');
const categoryRoutes = require('./routes/category');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const Category = require('./model/category');
const Product = require('./model/product');
const User = require('./model/user');
const Role = require('./model/role');
const UserRole = require('./model/userRole');
const Cart = require('./model/cart');
const CartItem = require('./model/cartItem');
const cartRoutes = require('./routes/cart')

const app = express();


app.use(bodyParser.json());
app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});

User.hasOne(Cart);

Category.hasMany(Product);

User.belongsToMany(Role, { through: UserRole }); 

Role.belongsToMany(User, { through: UserRole });

Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    app.listen(2616);
  })
  .catch((err) => console.log(err));