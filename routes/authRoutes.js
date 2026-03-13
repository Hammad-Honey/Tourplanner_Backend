const express =require('express');
const controllers = require('../controllers/authControllers')
const { login, signup }=controllers
const router=express.Router();


router.get('/login',login);
router.post('/signup',signup);


module.exports =router