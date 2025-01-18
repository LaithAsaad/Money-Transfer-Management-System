const express = require('express');
const { getByID } = require('../controllers/balance');
//import {test} from '../controllers/balance'
const test = require('../controllers/balance').test;
const getAll = require('../controllers/balance').getAll;
const add = require('../controllers/balance').add;
const getBalance = require('../controllers/balance').getBalance;
const verifyToken = require('../controllers/auth').verifyToken;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',verifyToken ,getAll.controller)
router.post('/',add.controller)
router.get('/:id',getBalance)

module.exports = router;