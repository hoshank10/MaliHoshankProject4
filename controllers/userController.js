const model = require('../models/user');
const { category, product } = require('../models/tradeModel');

exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
        .then(user => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });
};

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.session.fullname = user.firstName + " " + user.lastName
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));

};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([model.findById(id), product.find({ author: id })])
        .then(results => {
            const [user, stories] = results;
            let watchProducts = user.watchList;
            product.find({ _id: { $in: watchProducts } })
                .then(result => {
                    // console.log(result)
                    res.render('./user/profile', { user, stories, result });
                })
                .catch(err => next(err))
        })
        .catch(err => next(err));
};


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });

};

exports.unwatch = (req, res, next) => {
    let productId = req.params.id;
    let productWatch = req.body.productWatch;
    model.findById(req.session.user)
        .then(result => {
            model.updateOne({ _id: req.session.user }, { $pull: { "watchList": productId } })
                .then(() => {
                    req.flash('success', 'Product removed from watchlist.');
                    res.redirect('/users/profile')
                }
                )
                .catch(err => next(err))
        })
        .catch(err => next(err))
};


