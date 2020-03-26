const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, addRecipe, deleteRecipe } = require('../controllers/recipe-controller');

router
    .route('/recipes/')
    .get(getRecipes)
    .post(addRecipe);

router
    .route('/recipes/:id')
    .get(getRecipeById)
    .delete(deleteRecipe)

module.exports = router;