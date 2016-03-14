'use strict';

var express = require('express');

var controller = require('./engineer.controller');

var router = express.Router();


router.get('/', controller.index);
router.post('/', controller.create);
router.post('/search/', controller.search);


module.exports = router;
