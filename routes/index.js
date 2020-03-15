const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/dasboard', forwardAuthenticated, (req, res) => res.render('unauth'));

router.get('/', (req, res) => res.render('index'));
router.get('/public', (req, res) => res.render('construction'));
router.get('/about', (req, res) => res.render('construction'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;