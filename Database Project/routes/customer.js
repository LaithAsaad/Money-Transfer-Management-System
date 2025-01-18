const express = require('express')
const { getByID } = require('../controllers/customer');
//import {test} from '../controllers/customer'
const test = require('../controllers/customer').test;
const getAll = require('../controllers/customer').getAll;
const add = require('../controllers/customer').add;
const getCustomer = require('../controllers/customer').getCustomer;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getCustomer)
module.exports = router;