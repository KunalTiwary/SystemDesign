const todo = require('../model/todo');


exports.getAll = (req, res, next) => {
    todo.findAll().then((Todo) => {
        if(Todo.length == 0){
            return res.status(500).json({
                message: "add some first"
            })
        }
        res.status(200).json({
            Todo
        });
    })};


exports.createTodo = (req, res, next) => {
    todo.create({
        userId:req.userId,
        todo:req.todo,
        isCompleted:req.isCompleted,
      }).then((result) => {
        res.status(201).json({
          message: 'todo Created Successfully',
        });
      });
    };

    exports.gettodo = (req, res, next) => {
        todo.findAll({
            where: {
                userId: req.userId,
            },
          }).then((Todo) => {
            console.log(Todo)
            if(Todo.length == 0){
                return res.status(500).json({
                    message: "no todo created by this user"
                })
            }
            res.status(200).json({
                Todo
            });
        })
    }

    exports.updateTodo = (req, res, next) => {
        todo.findOne({
            where: {
                id : req.body.id,
            },
          }).then((Todo) => {
            if(Todo.userId != req.userId){
                return res.status(500).json({
                    message: "user not authorized"
                })
            }
            else{
                Todo.todo = req.body.todo;
                Todo.isCompleted = req.body.isCompleted;
                Todo.save().then((t)=> {
                    return res.status(200).json({
                        message: "updated"
                    })
                })
            }
        })

    }
