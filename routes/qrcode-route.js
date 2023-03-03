const express = require('express')
const { getQR, qrRedirect} = require('../controllers/qrcode-controller')

const router = express.Router()

router.get('/', qrRedirect)
router.get('/qrcode', getQR)

module.exports = router