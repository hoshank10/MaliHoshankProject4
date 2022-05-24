const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middleware/auth');
const { logInLimiter } = require('../middleware/rateLimiter');
const { validateSignUp, validateLogIn, validateResult } = require('../middleware/validator');
const router = express.Router();

router.post('/:id/unwatch', isLoggedIn, controller.unwatch);

router.get('/new', isGuest, controller.new);

//POST /users: create a new user account

router.post('/', isGuest, validateSignUp, validateResult, controller.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;