const Recipe = require('../models/Recipe');
const recipeScraper = require("recipe-scraper");


exports.getRecipes = async (req, res, next) => {
    try {
        const recipe = await Recipe.find();

        return res.status(200).json({
            success: true,
            count: recipe.length,
            data: recipe
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Recipe: ${error.message}`
        })
    }
}

exports.getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json( {
                success: false,
                error: 'Recipe Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            data: recipe
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Recipe ${req.params.id}: ${error.message}`
        })
    }
}

exports.addRecipe = async (req, res, next) => {
    try {
        const { author, recName, directions, ingredients } = req.body;

        const recipe = await Recipe.create(req.body);

        return res.status(201).json({
            success: true,
            data: recipe
        })
    } catch (error) {
        console.log(req);

        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Adding Recipe: ${error.message}`
            })
        }
    }

}

exports.addOtherRec = async (req, res, next) => {
    try {
        var recUrl = req.body.url
        
        var rec = await getRec(recUrl);
        const { hostname } = new URL(recUrl);

        const recipe = {
            recName: rec.name,
            ingredients: rec.ingredients,
            directions: rec.instructions,
            category: "Default",
            image: rec.image,
            sourceUrl: recUrl,
            author: hostname
        }

        await Recipe.create(recipe);

        return res.status(200).json({
            success: true,
            data: recipe
        })
    } catch (error) {

        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            req.flash('error_msg', `Error Adding Recipe: ${error.message}`);
            return res.status(500).json({
                success: false,
                error: `Error Adding Recipe: ${error.message}`
            })
        }
    }

}

exports.deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json( {
                success: false,
                error: 'Recipe Not Found'
            })
        }

        await recipe.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Deleting Recipe: ${error.message}`
        })
    }
}

 
// enter a supported recipe url as a parameter - returns a promise
async function getRec(url) {
  let recipe = await recipeScraper(url);
  return recipe;
}