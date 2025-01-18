const express = require('express')
const { getByID } = require('../controllers/payment');
//import {test} from '../controllers/payment'
const test = require('../controllers/payment').test;
const getAll = require('../controllers/payment').getAll;
const add = require('../controllers/payment').add;
const getPayment = require('../controllers/payment').getPayment;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getPayment)
module.exports = router;