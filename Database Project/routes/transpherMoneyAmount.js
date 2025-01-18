const express = require('express');
const { getByID } = require('../controllers/transpherMoneyAmount');
//import {test} from '../controllers/transpher_money_amount'
const test = require('../controllers/transpherMoneyAmount').test;
const getAll = require('../controllers/transpherMoneyAmount').getAll;
const add = require('../controllers/transpherMoneyAmount').add;
const getTranspherMoneyAmount = require('../controllers/transpherMoneyAmount').getTranspherMoneyAmount;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getTranspherMoneyAmount)

module.exports = router;