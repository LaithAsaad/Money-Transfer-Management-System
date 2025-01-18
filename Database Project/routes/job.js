const express = require('express');
const { getByID } = require('../controllers/job');
//import {test} from '../controllers/job'
const test = require('../controllers/job').test;
const getAll = require('../controllers/job').getAll;
const add = require('../controllers/job').add;
const getJOB = require('../controllers/job').getJOB;
const deleteById = require('../controllers/job').deleteById;
//const edit = require('../controllers/job').edit;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getJOB)
router.get('/delete/:id',deleteById.controller)
//router.post('/:id',edit)

module.exports = router;