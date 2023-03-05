const express = require('express')
const getInvitationList = require('../controllers/invitation-list-controller')

const router = express.Router()

router.get('/list', getInvitationList)

module.exports = router