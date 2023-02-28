const Guest = require('../models/guest')
const createPath = require('../helpers/create-path')

const getInvitationGenerator = (request, response) => {
  response.render(createPath('index'))
}

const postInvitationGenerator = (request, response) => {
    const {name, phoneNumber, pronoun, lang} = request.body
    const invitation = new Guest({name, phoneNumber, pronoun, lang})
    invitation
      .save()
      .then(result => {
        console.log(result)
        response.status(200).json(result)
    })
      .catch( error => console.log(error))
}

module.exports = {getInvitationGenerator, postInvitationGenerator}