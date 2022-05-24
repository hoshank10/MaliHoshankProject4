const { body } = require('express-validator');
const { validationResult } = require('express-validator');

//check if the route parameter is valid ObjectId value
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Invalid story id');
        err.status = 400;
        req.flash('error', err.message);
        return res.redirect('back');
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateStory = [body('Category', 'Category cannot be empty').notEmpty().trim().escape(),
body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('sub_title', 'Sub title cannot be empty').notEmpty().trim().escape(),
body('Desc', 'Description must be at least 10 characters').isLength({ min: 15 }).trim().escape()];