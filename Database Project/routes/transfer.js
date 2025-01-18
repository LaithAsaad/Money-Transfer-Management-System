const express = require('express')
const { getByID } = require('../controllers/transfer');
//import {test} from '../controllers/transfer'
const test = require('../controllers/transfer').test;
const getAll = require('../controllers/transfer').getAll;
const add = require('../controllers/transfer').add;
const getTransfer = require('../controllers/transfer').getTransfer;
const updateReceive = require('../controllers/transfer').updateReceive;
const updateCancel = require('../controllers/transfer').updateCancel;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getTransfer)
router.post('/editReceive/:id',updateReceive.controller)
router.post('/editCancel/:id',updateCancel.controller)
module.exports = router;