const router = require('express').Router();
const { User } = require('../../models');

//creating a new user route
router.post('/', async (req, res) => {
  try{
    let userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.get({ plain:true }).id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err){
    res.status(500).json(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ 
      where: { email: req.body.email } 
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect login info please try again" });
      return;
    }

    let validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect login info please try again" });
      return;
    }
    
    req.session.save(() => {
      
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({message: "Successful login",userData});
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

//logout route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
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