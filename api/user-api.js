const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/user-controller');


router
    .route('/')
    .get(getUsers)
    .post(addUser);

/* router
    .route('/:id')
    .delete(addUser) */

module.exports = router;