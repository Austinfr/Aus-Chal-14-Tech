const router = require('express').Router();
const { User } = require('../../models');

//creating a new user route
router.post('/', async (req, res) => {
  try{
    //tries to create a user
    let userData = await User.create(req.body);

    //if successful we will create a session to register the user as logged in
    req.session.save(() => {
      req.session.user_id = userData.get({ plain:true }).id;
      req.session.logged_in = true;

      res.status(200);
    });
  } catch (err){
    res.status(500).json(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    //given the email we will try to find a user
    let userData = await User.findOne({ 
      where: { email: req.body.email } 
    });

    //user hasn't been registered yet or email was entered incorrectly
    if (!userData) {
      res.status(400).json({ message: "Incorrect login info please try again" });
      return;
    }

    //next we check the password so not anyone can log in
    let validPassword = await userData.checkPassword(req.body.password);

    //if they misspell the password
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect login info please try again" });
      return;
    }
    
    //if successful we log the user in
    req.session.save(() => {
      
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({message: "Successful login"});
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout route
router.post('/logout', (req, res) => {

  console.log(req.session);
  //if we're logged in
  if (req.session.logged_in) {
    //we set the logged in to false and get rid of the session variable
    req.session.logged_in = false;
    req.session.destroy(() => {
      res.status(204).end();
    });

    res.redirect('/login');

  } else {
    res.status(404).end();
  }
});

module.exports = router;