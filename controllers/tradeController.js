const { category, product } = require('../models/tradeModel');
const trades = require('../models/trades');
const model = require('../models/user');

exports.index = (req, res) => {
    category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "catName",
                foreignField: "catName",
                as: "products"
            }
        },
        {
            $unwind: {
                path: "$products"
            }
        },
        {
            $match: {
                "products.status": "available"
            }
        },
        {
            $group: {
                _id: "$catName",
                catName: { $first: "$catName" },
                bgImg: { $first: "$bgImg" },
                products: { $push: "$products" }
            }
        },
        {
            $sort: { catName: 1 }
        }
    ])
        .then(stories => {
            console.log(stories)
            res.render('./trade/trades', { stories });
        })
        .catch(err => next(err))

};

exports.new = (req, res) => {
    res.render('./trade/newTrade');
};

exports.create = (req, res) => {

    let item = req.body;

    category.find({ catName: item.Category })
        .then(it => {
            if (it.length == 0) {
                let s = new category({ catName: item.Category, bgImg: item.Category_Img })
                s.save()
                    .then(() => {
                        let p = new product({
                            author: req.session.user, catName: item.Category, title: item.title, sub_title: item.sub_title,
                            Img: item.Product_Img, Desc: item.Desc, author_name: req.session.fullname, status: "available"
                        });
                        p.save()
                            .then(() => {
                                req.flash('success', "Product added successfully");
                                res.redirect('/trades');
                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err))

            }
            else {
                let p = new product({
                    author: req.session.user, catName: item.Category, title: item.title, sub_title: item.sub_title,
                    Img: item.Product_Img, Desc: item.Desc, author_name: req.session.fullname, status: "available"
                });
                p.save()
                    .then(() => {
                        req.flash('success', "Product added successfully");
                        res.redirect('/trades');
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))

};

exports.show = (req, res, next) => {
    let id = req.params.id;
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid item id');
    //     err.status = 400;
    //     return next(err);
    // }
    product.findById(id)
        .then(story => {
            if (story) {
                trades.find({ $and: [{ RequesterId: req.session.user, ReceiverProductId: id, tradeStatus: "pending" }] })
                    .then((res1) => {
                        story.flag = false;
                        if (res1.length > 0) {
                            story.flag = true;
                        }
                        model.find({ _id: req.session.user, watchList: id })
                            .then(result => {
                                story.productWatch = "Watch"
                                if (result.length > 0) {
                                    story.productWatch = "unWatch"
                                }
                                res.render('./trade/trade', { story });
                            })
                            .catch(err => next(err))
                    }
                    )
                    .catch(err => next(err))
            }
            else {
                let err = new Error('No Item with id ' + id + ' found. Please re-check the entered id !');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
};


exports.edit = (req, res, next) => {
    let id = req.params.id;
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid item id');
    //     err.status = 400;
    //     return next(err);
    // }

    product.findById(id)
        .then(story => {
            if (story) {
                category.find({ catName: story.catName })
                    .then(result => {
                        let cat = {}
                        cat.catName = result[0].catName
                        cat.bgImg = result[0].bgImg
                        res.render('./trade/edit', { story, cat });
                    })

            }
            else {
                let err = new Error('No Item with id ' + id + ' found. Please re-check the entered id !');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
};

exports.update = (req, res, next) => {
    let trade = req.body;
    let id = req.params.id;
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid item id');
    //     err.status = 400;
    //     return next(err);
    // }
    category.find({ catName: trade.Category })
        .then(result => {

            if (result.length > 0) {
                product.updateOne({ _id: id }, {
                    $set: {
                        catName: trade.Category, title: trade.title, sub_title: trade.sub_title,
                        Img: trade.Product_Img, Desc: trade.Desc, author_name: req.session.fullname
                    }
                }, { runValidators: true })
                    .then(trade => {
                        if (trade) {
                            req.flash('success', "Product updated successfully");
                            res.redirect('/trades/' + id);
                        } else {
                            let err = new Error('Invalid item id');
                            err.status = 404;
                            next(err);
                        }
                    })
                    .catch(err => {
                        if (err.name == "ValidationError") {
                            err.status = 400;
                        }
                        next(err);
                    })
            } else {
                let cat = new category({ catName: trade.Category, bgImg: trade.Category_Img })
                cat.save()
                    .then(() => {

                    })
                    .catch(err => {
                        if (err.name == "ValidationError") {
                            err.status = 400;
                        }
                        next(err);
                    });
                product.updateOne({ _id: id }, {
                    $set: {
                        catName: trade.Category, title: trade.title, sub_title: trade.sub_title,
                        Img: trade.Product_Img, Desc: trade.Desc, author_name: req.session.fullname
                    }
                }, { runValidators: true })
                    .then(trade => {
                        if (trade) {
                            req.flash('success', "Product updated successfully");
                            res.redirect('/trades/' + id);
                        } else {
                            let err = new Error('Invalid item id');
                            err.status = 404;
                            next(err);
                        }
                    })
                    .catch(err => {
                        if (err.name == "ValidationError") {
                            err.status = 400;
                        }
                        next(err);
                    })
            }
        })
        .catch(err => next(err))
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid item id');
    //     err.status = 400;
    //     return next(err);
    // }
    product.findByIdAndDelete(id, { useFindAndModify: false })
        .then(trade => {
            if (trade) {
                trades.updateMany({ $or: [{ RequesterProductId: id }, { ReceiverProductId: id }], tradeStatus: "pending" }, { $set: { tradeStatus: "rejected" } })
                    .then(result => {
                        res.redirect('/trades');
                    })
                    .catch(err => next(err))
            } else {
                let err = new Error('No Item with id ' + id + ' found to delete');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.deleteCatForm = (req, res, next) => {
    category.find()
        .then(category => {
            if (category.length > 0) {
                res.render('./trade/deleteCat', { category });
            } else {
                let err = new Error('No category to delete.');
                err.status = 404;
                next(err);
            }
        })
};

exports.deleteCat = (req, res, next) => {
    let cat = req.body.Category;
    category.deleteOne({ catName: cat })
        .then(() => {
            product.deleteMany({ catName: cat })
                .then(() => {
                    res.redirect('/trades');
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.makeTrade = (req, res, next) => {
    let existingProduct = [];
    let productId = req.params.id;
    trades.find({ RequesterId: req.session.user })
        .then(tradesp => {
            if (tradesp.length > 0) {
                // console.log(tradesp)
                tradesp.forEach(trade => {
                    if (trade.tradeStatus == "pending" || trade.tradeStatus == "accepted")
                        existingProduct.push(trade.RequesterProductId);
                })
            }
            // console.log(existingProduct)
            product.find({ author: req.session.user, _id: { $nin: existingProduct }, status: "available" })
                .then(products => {
                    // console.log(products)
                    if (products.length > 0) {
                        res.render('./trade/makeTrade', { products, productId })
                    } else {
                        let err = new Error("You don't have any product to trade");
                        err.status = 404;
                        next(err);
                    }
                })
                .catch(err => next(err))
            // else {
            //     let products = []
            //     res.render('./trade/makeTrade', { products, productId })
            // }
        })
        .catch(err => next(err))

};

exports.createTrade = (req, res, next) => {
    let tradesDetail = {}
    tradesDetail.RequesterProductId = req.body.products
    tradesDetail.ReceiverProductId = req.params.id;
    tradesDetail.RequesterId = req.session.user;

    product.findById(tradesDetail.ReceiverProductId)
        .then(product1 => {
            tradesDetail.ReceiverId = product1.author;
            tradesDetail.ReceiverProductName = product1.title;
            Promise.all([model.findById(tradesDetail.ReceiverId), model.findById(tradesDetail.RequesterId),
            product.findById(tradesDetail.RequesterProductId)])
                .then(user1 => {
                    tradesDetail.ReceiverName = user1[0].firstName + " " + user1[0].lastName;
                    tradesDetail.RequesterName = user1[1].firstName + " " + user1[1].lastName;
                    tradesDetail.RequesterProductName = user1[2].title;
                    //console.log(tradesDetail)
                    let trade1 = new trades(tradesDetail);
                    trade1.save()
                        .then(() => {
                            req.flash('success', 'Trade Offer Created Successfully');
                            res.redirect('/trades/tradeHistory');
                        })
                        .catch(err => next(err))
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.displayTradeHistory = (req, res, next) => {
    let myTradeOffers = [];
    let myTradeHistory = [];
    let userId = req.session.user;
    trades.find({ $and: [{ RequesterId: userId }, { tradeStatus: "pending" }] })
        .then(tradesp => {
            if (tradesp.length > 0) {
                myTradeOffers = tradesp;
            }
            trades.find({ $or: [{ RequesterId: userId }, { ReceiverId: userId }], tradeStatus: { $ne: "pending" } })
                .sort({ createdAt: -1 })
                .then(tradesp1 => {
                    if (tradesp1.length > 0) {
                        myTradeHistory = tradesp1;
                    }
                    res.render('./trade/tradeHistory', { myTradeOffers, myTradeHistory });
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.cancelOffer = (req, res, next) => {
    let tradeID = req.params.id;
    trades.findById(tradeID)
        .then(result => {
            trades.updateOne({ _id: tradeID }, { $set: { tradeStatus: "cancelled" } })
                .then(() => {
                    req.flash('success', 'Trade Cancelled Successfully');
                    res.redirect('/trades/tradeHistory')
                }
                )
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.displayTradeOffers = (req, res, next) => {
    let myTradeOffers = [];
    let userId = req.session.user;
    trades.find({ $and: [{ ReceiverId: userId }, { tradeStatus: "pending" }] })
        .then(tradesp => {
            if (tradesp.length > 0) {
                myTradeOffers = tradesp;
            }
            res.render('./trade/tradeOffers', { myTradeOffers })
        })
        .catch(err => next(err))
};

exports.acceptOffer = (req, res, next) => {
    let tradeID = req.params.id;
    trades.findById(tradeID)
        .then(result1 => {
            // console.log(result1)
            trades.updateOne({ _id: tradeID }, { $set: { tradeStatus: "accepted" } })
                .then(result => {
                    product.updateMany({ $or: [{ _id: result1.RequesterProductId }, { _id: result1.ReceiverProductId }] }, { $set: { status: "Not available" } })
                        .then(() => {
                            Promise.all([
                                trades.updateMany({ ReceiverProductId: result1.ReceiverProductId, tradeStatus: "pending" }, { $set: { tradeStatus: "rejected" } }),
                                trades.updateMany({ RequesterProductId: result1.RequesterProductId, tradeStatus: "pending" }, { $set: { tradeStatus: "rejected" } }),
                                trades.updateMany({ ReceiverProductId: result1.RequesterProductId, tradeStatus: "pending" }, { $set: { tradeStatus: "rejected" } }),
                                trades.updateMany({ RequesterProductId: result1.ReceiverProductId, tradeStatus: "pending" }, { $set: { tradeStatus: "rejected" } })])
                                .then(res1 => {
                                    // console.log(res1)
                                    req.flash('success', 'Trade Accepted Successfully');
                                    res.redirect('/trades/tradeOffers')
                                })

                        })
                        .catch(err => next(err))
                }
                )
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.declineOffer = (req, res, next) => {
    let tradeID = req.params.id;
    trades.findById(tradeID)
        .then(result => {
            trades.updateOne({ _id: tradeID }, { $set: { tradeStatus: "declined" } })
                .then(() => {
                    req.flash('error', 'Trade declined Successfully');
                    res.redirect('/trades/tradeOffers')
                }
                )
                .catch(err => next(err))
        })
        .catch(err => next(err))
};

exports.watch = (req, res, next) => {
    let productId = req.params.id;
    let productWatch = req.body.productWatch;
    model.findById(req.session.user)
        .then(result => {
            if (productWatch == "Watch") {
                model.updateOne({ _id: req.session.user }, { $push: { "watchList": productId } })
                    .then((res1) => {
                        req.flash('success', 'Product added to watchlist. view it on your profile');
                        res.redirect('/trades/' + productId)
                    }
                    )
                    .catch(err => next(err))
            }
            else {
                model.updateOne({ _id: req.session.user }, { $pull: { "watchList": productId } })
                    .then(() => {
                        req.flash('success', 'Product removed from watchlist.');
                        res.redirect('/trades/' + productId)
                    }
                    )
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
};



