const router = require('express').Router();
const todoController = require('../controller/todo');
const isAuth = require('../middleware/is-auth');

router.get('/api/v1/todos/get', isAuth, todoController.getAll);

router.post('/api/v1/todo/post', isAuth, todoController.createTodo);

router.get('/api/v1/todo/get', isAuth, todoController.gettodo);

router.put('/api/v1/todoupdate/post', isAuth, todoController.updateTodo);

module.exports = router;