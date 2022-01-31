const loginRouter = require('express').Router();
const users = require('../controllers/users');

loginRouter.post('/', users.logUser)

module.exports = loginRouter;