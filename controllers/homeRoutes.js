const router = require('express').Router();
const { Post, User } = require('../models');
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

router.get('/post/:id', async (req, res) => {
  try {
    
    let postData = await Post.findByPk(req.params.id);

    let posts = [postData.get({ plain:true })];

    res.render('homepage', {
      post,
      logged_in: req.session.logged_in,
      addComment: true
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;