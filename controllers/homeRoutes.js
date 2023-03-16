const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../util/auth');

//homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//dashboard route
router.get('/dashboard', withAuth, (req, res) => {

});

//login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//signup route
router.get('/sign-up', (req, res) => {
  res.render('signup');
});

module.exports = router;