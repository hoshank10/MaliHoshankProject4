const express = require("express");
const router = express.Router();
const controller = require('../controllers/tradeController');
const { isLoggedIn, isAuthor } = require('../middleware/auth');
const { validateId, validateStory, validateResult } = require('../middleware/validator');

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.get('/deleteCat', controller.deleteCatForm);

router.post('/:id/watch', isLoggedIn, controller.watch);

router.get('/:id/makeatrade', isLoggedIn, controller.makeTrade);

router.post('/:id/tradeHistory', isLoggedIn, controller.createTrade);

router.post('/cancelOffer/:id', controller.cancelOffer);

router.post('/accept/:id', controller.acceptOffer);

router.post('/decline/:id', controller.declineOffer);

router.get('/tradeHistory', isLoggedIn, controller.displayTradeHistory);

router.get('/tradeOffers', isLoggedIn, controller.displayTradeOffers);

router.post('/', isLoggedIn, validateStory, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor, validateStory, validateResult, controller.update);

router.delete('/deleteCat', controller.deleteCat);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);


module.exports = router; 