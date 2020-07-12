const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.render('recipe', {recipe: req.params.id, user: req.user })

});




module.exports = router;