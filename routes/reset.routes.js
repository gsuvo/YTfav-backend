const express = require('express');
const router = express.Router();
const resetController = require('../controllers/reset.controller');

router.post('/forgot-password', resetController.forgotPassword);
router.post('/reset-password', resetController.resetPassword);

module.exports = router;
