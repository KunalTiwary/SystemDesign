const Movies = require('../model/movies');
const Tickets = require('../model/tickets');




exports.bookTicket = (req, res, next) => {
    Movies.findOne({
        where:{
            id:req.params.id,
        },
    }).then((movie) => {
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        movie.tickets -= 1;
        movie.save().then((result) => {
            Tickets.create({
                userId: req.userId,
                movieId: req.params.id,
              }).then((result) => {
                res.status(201).json({
                  message: 'Ticket Booking Successful',
                });
              });
            });
        });
      }


exports.deleteTicket = (req, res, next) => {
    console.log("HIIIIIIIIIIII")
    Movies.findOne({
        where:{
            id:req.params.id,
        },
    }).then((movie) => {
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        movie.tickets += 1;
        movie.save().then((result) => {
        Tickets.findOne({
            where:{
                movieId:req.params.id,
            },
        }).then((ticket) => {
            ticket.destroy().then((result) => {
                res.status(200).json({
                  message: 'Ticket Cancelled successfully',
                });
              })
            })
                .catch((error) => {
                if(!error.statusCode){
                    error.statusCode = 500;
                }
                next(error);
            });
              });
            });
        };

// IF THE GET CALLS ARE NOT WORKING SIMPLY FETCH DATA USING FINDALL WITH WHERE CONDITION 

exports.getTicket = (req, res, next) => {
    Tickets.findAll({
        where : {
            userId: req.userId,
        }
    }).then((tickets) => {
        if (tickets.length == 0){   
            return res.status(404).json({
              message: 'No tickets Found',
            });
          }
        res.status(200).json({
            tickets,
        });
    })
} 

