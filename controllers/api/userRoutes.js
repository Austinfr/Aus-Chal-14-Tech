const router = require('express').Router();
const { User } = require('../../models');

//creating a new user route
router.post('/', async (req, res) => {
  try{
    let response = await User.create(req.body);

    if(response.ok){
      res.session.user_id = await User.findOne({where: { email: req.body.email }}).id;
      res.session.logged_in = true;

      res.status(200);
      res.redirect('/dashboard');
    }

  } catch (err){
    res.status(500).json(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400);
      return;
    }

    let validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400);
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.status(200);
    res.redirect('/dashboard');

  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

//logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;