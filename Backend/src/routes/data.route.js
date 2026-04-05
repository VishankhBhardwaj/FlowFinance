const express = require('express')
const dataController = require('../controllers/data.controller')
const router = express.Router()
router.post('/fetch',dataController.fetchData)
router.get('/transactions',dataController.transactions)
router.post('/upload',dataController.uploadData);
module.exports = router;