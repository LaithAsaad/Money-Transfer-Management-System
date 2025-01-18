const express = require('express');
const { getByID } = require('../controllers/bankTrasfer');
//import {test} from '../controllers/bankTrasfer'
const test = require('../controllers/bankTrasfer').test;
const getAll = require('../controllers/bankTrasfer').getAll;
const add = require('../controllers/bankTrasfer').add;
const getBankTrasfer = require('../controllers/bankTrasfer').getBankTrasfer;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getBankTrasfer)

module.exports = router;