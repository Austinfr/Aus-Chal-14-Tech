const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../util/auth');


//homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts =  postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
    
  } catch(err){
    res.status(500).json(err);
  }
  
});

//login route
router.get('/login', (req, res) => {
  if(req.session.logged_in){
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//signup route
router.get('/sign-up', (req, res) => {
  res.render('signup');
});

// Render the create post form
router.get('/newpost', withAuth, (req, res) => {
  res.render('create-post');
});

//for getting a specific post
router.get('/post/:id', async (req, res) => {
  try {
    
    let postData = await Post.findByPk(req.params.id, { include: Comment });

    let post = postData.map((post) => post.get({ plain: true }));
    console.log(post);
    res.render('post', { 
      post,
      logged_in: res.session.logged_in
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;