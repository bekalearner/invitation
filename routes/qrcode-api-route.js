const express = require('express')
const qrGen = require('../controllers/qrcode-api-controller')

const router = express.Router()

router.get('/api/qrcode', qrGen)

module.exports = router