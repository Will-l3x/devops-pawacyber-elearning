'use strict';
var express = require('express');
var router = express.Router();

//ref your contollers here
var _auth = require('../controllers/_auth.js');
var _media_server = require('../controllers/_media_server.js');
var _systemadmin = require('../controllers/_systemadmin.js');

////////////////////////auth/////////////////////////////////// all users
router.post('/login', _auth.login);//done
//router.post('/test', _auth.test);//done
router.put('/changepw', _auth.changepassword);
router.post('/register', _auth.register);
//router.post('/verify', _auth.verifyacc);
router.get('/profile', _auth.profile);
router.put('/resetpassword', _auth.resetpassword);

//////////////////////systemadmin//////////////////////////////////////////////
router.get('/roles', _systemadmin.roles);
router.get('/role/:id', _systemadmin.role);
router.delete('/del_role/:id', _systemadmin.del_role);
router.post('/add_role', _systemadmin.add_role);
router.put('/update_role', _systemadmin.update_role);

router.get('/subscriptions', _systemadmin.subscriptions);
router.post('/add_subscription', _systemadmin.add_subscription);
router.delete('/del_subscription/:id', _systemadmin.del_subscription);
router.get('/subscription/:id', _systemadmin.subscription);
router.get('/update_subcription', _systemadmin.update_subscription);

router.get('/schools', _systemadmin.schools);
router.get('/school/:id', _systemadmin.school);
router.post('/add_school', _systemadmin.add_school);
router.put('/update_school', _systemadmin.update_school);











//////////////////////mediaplayer//////////////////////////////////////////////
router.get('/playvideo', _media_server.playvideo);

module.exports = router;
