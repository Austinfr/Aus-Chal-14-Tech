const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../util/auth');

//homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//dashboard route
router.get('/dashboard', withAuth, async(req, res) => {
  try{

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const posts = postData.map((post) => post.get({plain:true}));

    res.render('dashboard', {
      posts
    });
    
  } catch(err){
    res.status(500).json(err);
  }
  
});

//login route
router.get('/login', (req, res) => {
  if(req.session.logged_in){
    res.render('/dashboard');
  }

  res.render('login');
});

//signup route
router.get('/sign-up', (req, res) => {
  res.render('signup');
});

module.exports = router;