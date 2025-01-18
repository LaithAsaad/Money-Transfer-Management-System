const express = require('express');
const { getByID } = require('../controllers/moneyClass');
//import {test} from '../controllers/moneyClass'
const test = require('../controllers/moneyClass').test;
const getAll = require('../controllers/moneyClass').getAll;
const add = require('../controllers/moneyClass').add;
const getMoneyClass = require('../controllers/moneyClass').getMoneyClass;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getMoneyClass)

module.exports = router;