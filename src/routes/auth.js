import express from 'express';
import authController from  '../controllers/authController.js'
import userController from  '../controllers/userController.js'

let router = express.Router();

/*
 * POST
 */
router.post('/login', function(req, res) {
    authController.login(req, res);
});

/*
 * POST
 */
router.post('/sign', function(req, res) {
    userController.create(req, res);
});

module.exports = router;
