const Guest = require('../models/guest')
const createPath = require('../helpers/create-path')
const client = require('../helpers/whatsapp-client')

const getInvitationGenerator = (request, response) => {
  response.render(createPath('index'))
}

module.exports = {getInvitationGenerator}