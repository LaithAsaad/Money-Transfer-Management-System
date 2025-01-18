const express = require('express')
const { getByID } = require('../controllers/employee');
//import {test} from '../controllers/employee'
const test = require('../controllers/employee').test;
const getAll = require('../controllers/employee').getAll;
const add = require('../controllers/employee').add;
const getEmployee = require('../controllers/employee').getEmployee;
const update = require('../controllers/employee').update;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getEmployee)
router.post('/edit/:id',update.controller)
module.exports = router;