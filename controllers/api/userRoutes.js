const router = require('express').Router();
const { User } = require('../../models');

// /api/user/ routes

// creates new user
router.post('/', async (req, res) => {
  try {
    if (req.body.password.length >= 8) {
      const userData = await User.create({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });
    } else {
      res.status(400).json({ message: "Password must be atleast eight characters long!" });
    };
  } catch (err) {
    res.status(400).json("error:", err);
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json('error:', err);
  }
});

// logout route
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
