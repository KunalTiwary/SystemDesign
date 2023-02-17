const Cart = require('../model/cart');

exports.getCart = (req, res, next) => {
    Cart.findByPk(req.params.id).then((cart) => {
        if (!cart) {
            return res.status(404).json({
              message: 'Cart not found',
            });
          }
        const products = cart.getProducts();
        let totalCost = 0;
        for (let product of products) {
            totalCost += +product.cost * +product.cartItem.quantity;
            console.log('hiiiix', totalCost);
          } 
          return res.status(200).json({
            products: products,
            totalCost: totalCost,
    })
    }
)}