const { createUser, loginUser, getAll, getOne, isActive, updateUser, getCurrentUser} = require('../controllers/user.controller');
const express = require('express');
const protect = require('../middlewares/auth.middleware');

const routerUser = express.Router();

routerUser.route('/')
    .post(createUser)
    .get(getAll);

routerUser.route('/profile')
    .put(protect, updateUser)
    .get(protect, getCurrentUser);
    
routerUser.route('/login')
    .post(loginUser);

routerUser.route('/:id')
    .get(protect , getOne)
    .put(isActive);
    
module.exports = routerUser;