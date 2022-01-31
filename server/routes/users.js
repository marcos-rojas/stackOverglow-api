const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

router.post('/', catchAsync(users.createUser));

module.exports = router;