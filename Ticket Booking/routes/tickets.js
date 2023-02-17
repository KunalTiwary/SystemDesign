const router = require('express').Router();
const isAuth = require('../middleware/is-auth');


const ticketsController = require('../controller/tickets');

router.post('/bookTicket/:id', isAuth, ticketsController.bookTicket);

router.delete('/deleteTicket/:id', isAuth, ticketsController.deleteTicket);

router.get('/getTickets', isAuth, ticketsController.getTicket);

module.exports = router;