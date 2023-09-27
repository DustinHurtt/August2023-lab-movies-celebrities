var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

router.get('/add-movie', (req, res, next) => {

    Celebrity.find()
    .then((celebrities) => {

        res.render('movies/new-movie.hbs', { celebrities })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.post('/add-movie', (req, res, next) => {

    let newMovie = req.body

    Movie.create(newMovie)
    .then((newMovie) => {
        console.log("Created movie ===>", newMovie)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.get('/', (req, res, next) => {

    Movie.find()
    .then((movies) => {
        
        res.render('movies/movies.hbs', { movies })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.get('/details/:movieId', (req, res, next) => {

    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movie) => {
        console.log("Found movie ===>", movie)
        res.render('movies/movie-details.hbs', movie)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

module.exports = router;