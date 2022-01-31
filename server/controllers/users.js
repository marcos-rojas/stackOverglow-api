const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

module.exports.createUser = async (req, res) => {
  try{
    const { username, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({username, passwordHash});
    const savedUser = await user.save();
    
    res.status(201);
    res.json(savedUser);
  }catch (e) {
        return res.redirect('/register');
  }
};

module.exports.logUser = async (request, response, next) => {
  
  try{

    const { username, password } = request.body;
    if(password.length < 5 || !username){
      response.status(401);
      response.send({
        error: 'invalid user or password'
      });
      response.end()
    }
    const user = await User.findOne({ username })
  
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
      response.status(401);
      response.send({
        error: 'invalid user or password'
      })
    }
    
    const userForToken = {
      id: user._id,
      username: user.username
    }
  
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    );
    
    response.send({
      username: user.username,
      token
    })
  }catch (e) {
    response.status(500);
    response.json({
      error: 'invalid de'
    })
  }
};
