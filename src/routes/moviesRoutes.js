const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/create/', moviesController.create);
router.post('/movies/', moviesController.store);
router.get('/movies/edit/:id', moviesController.edit);
router.get('/movies/:id', moviesController.getOne);
router.put('/movies/:id', moviesController.update);


router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/new', moviesController.new);







module.exports = router;