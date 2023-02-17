const Movies = require('../model/movies');


exports.getAllMovies = (req, res, next) => {
    let totalItems;
    Movies.findAll().then((movies) => {totalItems = movies.length})
  
    let page = req.query.page || 1; 
    let limit = 2;

    Movies.findAll({
        limit: limit,
        offset: (page - 1) * limit,
    }).then((movies => {
        const PageMarker = "Displaying" + " " + limit + " " + "out of" + " " + totalItems;
        res.status(200).json({
            movies,
            PageMarker, 
        });
    }));
};
  
exports.getMovie = (req, res, next) => {
    Movies.findOne({
        where:{
            id: req.params.id,
        },
    })
    .then((movie)=>{
        if(!movie){
            return res.status(404).json({
                message: 'Movie not found',
              });
        }
        res.status(200).json({
            movie,
          });
    })
    .catch((error) => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    });
};


exports.createMovie = (req, res, next) => {
    Movies.create({
        name: req.body.name,
        tickets: req.body.tickets,
      }).then((result) => {
        res.status(201).json({
          message: 'Movie Created Successfully',
        });
      });
    };


exports.updateMovies = (req, res, next) => {
    Movies.findOne({
        where:{
            id:req.params.id,
        },
    })
        .then((movie) => {
            if(!movie){
                return res.status(404).json({
                    message:"Movie not found"
                });
            }
            movie.name = req.body.name;
            movie.tickets = req.body.tickets;
            movie.save().then((result) => {
              res.status(200).json({
                message: 'Movie updated successfully',
                movie,
              });
            });
          })
          .catch((error) => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          });
      };


exports.deleteMovie = (req, res, next) => {
    Movies.findOne({
        where: {
        id: req.params.id,
    },
})
    .then((movie) => {
        if (!movie){
            return res.status(404).json({
                message : "movie not found",
            });
        }
        movie.destroy().then((result) => {
        res.status(200).json({
          message: 'Movie deleted successfully',
        });
      })
    })
        .catch((error) => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    });
    };
