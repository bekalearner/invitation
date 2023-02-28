const express = require('express')
const { getInvitationRU, getInvitationKG } = require('../controllers/invitation-controller')

const router = express.Router()

router.get('/invitation/ru/:id', getInvitationRU)
router.get('/invitation/kg/:id', getInvitationKG)

module.exports = router