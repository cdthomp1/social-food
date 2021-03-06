const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Recipe Author']
    },
    sourceUrl: {
        type: String
    },
    recName: {
        type: String,
        required: [true, 'Please Enter Recipe Name']
    },
    image: {
        type: Object
    },
    category : {
        type: String,
        required: [true, "Please Enter a Category"]
    },
    ingredients : {
        type: [],
        required: [true, 'Please Enter At-least One Ingredient']
    },
    directions : {
        type: [],
        required: [true, 'Please Enter At-least One Direction']
    },
    createdAt: {
        type: Date,
        defualt: Date.now()
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema)