const { category, product } = require('../models/tradeModel');

//check if user is a guest

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in ');
        return res.redirect('/users/profile');
    }

}

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first ');
        return res.redirect('/users/login');
    }

}

//check if the user is the author of the story
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    product.findById(id)
        .then(story => {
            if (story) {
                if (story.author == req.session.user) {
                    return next();
                } else {
                    let err = new Error('Unauthorized to access the resource');
                    err.status = 401;
                    return next(err);
                }
            }

        })
        .catch(err => next(err));
}