'use strict';
const express = require('express');
const userCtrl = require('../controller/user');


const router = express.Router();

router.post('/users', userCtrl.create);
router.post('/user/login', userCtrl.login);
router.get('/user', userCtrl.get);
router.put('/user', userCtrl.updateCurrentUser);
module.exports = router;
