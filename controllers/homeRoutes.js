const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../util/auth');


//homepage route
router.get('/', async (req, res) => {
  try {
    //gets all the posts
    const postData = await Post.findAll();

    //gets only what we need from that data
    const posts =  postData.map((post) => post.get({ plain: true }));

    //we'll render the hompage handlebars with the post that we got from our database
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
    //tries to get any posts the user has made
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    //we get the plain view so it's easier to process
    const posts = postData.map((post) => post.get({ plain: true }));

    //populate our dashboard with any user posts
    res.render('dashboard', {
      posts,
      isDashboard: true,
      logged_in: req.session.logged_in
    });
    
  } catch(err){
    res.status(500).json(err);
  }
  
});

//login route
router.get('/login', (req, res) => {
  //if we're already logged in we'll go to the dashboard
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
    //tries to find the post based on that id
    let postData = await Post.findByPk(req.params.id);
    //tries to find any associated comments
    let commentData = await Comment.findAll({ 
      where: { 
        post_id: req.params.id
      }
    });
    //renders this specific post in plainview
    let post = postData.get({ plain: true });
    let comments = commentData.map(comment => comment.get({ plain: true }));
    
    res.render('post', { 
      post,
      comments,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//when a user wants to update a post
router.get('/updatePost/:id', async (req, res) => {
  try{

    //tries to find the post based on that id
    let postData = await Post.findByPk(req.params.id);

    //renders this specific post in plainview
    let post = postData.get({ plain: true });

    res.render('update-post', {
      post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;