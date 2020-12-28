const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



// Welcome Page
router.get('/dasboard', forwardAuthenticated, (req, res) => res.render('unauth'));

router.get('/', (req, res) => res.render('publicRecs', {user: req.user }));
router.get('/public', (req, res) => res.render('publicRecs', {user: req.user }));
router.get('/about', (req, res) => res.render('construction', {user: req.user }));
router.get('/addRec', ensureAuthenticated, (req, res) => res.render('addRec', {user: req.user }));
router.get('/other', ensureAuthenticated, (req, res) => res.render('other', {user: req.user }));



// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user, auth: true });
});

module.exports = router;