const createPath = require('../helpers/create-path')

const getInvitationGenerator = (request, response) => {
  response.render(createPath('index'))
}

module.exports = { getInvitationGenerator }