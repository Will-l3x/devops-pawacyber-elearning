'use strict';
var express = require('express');
var router = express.Router();

//ref your contollers here
var _auth = require('../controllers/_auth.js');
var _media_server = require('../controllers/_media_server.js');

////////////////////////auth/////////////////////////////////// all users
//router.post('/login', _auth.login);//done
//router.post('/test', _auth.test);//done
//router.put('/changepw', _auth.changepassword);
//router.post('/register', _auth.register);
//router.post('/verify', _auth.verifyacc);
//router.get('/profile', _auth.profile);
//router.put('/resetpassword', _auth.resetpassword);

//////////////////////teacher//////////////////////////////////////////////
//add your teacher endpoints here

//////////////////////student//////////////////////////////////////////////
//add your student endpoints here... well you get the gist

//////////////////////mediaplayer//////////////////////////////////////////////
router.get('/playvideo', _media_server.playvideo);

module.exports = router;
