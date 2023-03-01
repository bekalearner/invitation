const Guest = require('../models/guest')
const createPath = require('../helpers/create-path')
const client = require('../helpers/whatsapp-client')

const getInvitationGenerator = (request, response) => {
  response.render(createPath('index'))
}

const postInvitationGenerator = (request, response) => {
    const {name, phoneNumber, pronoun, lang} = request.body
    const invitation = new Guest({name, phoneNumber, pronoun, lang})
    invitation
      .save()
      .then(async result => {
        console.log(result)

        const number = result.phoneNumber.slice(1)
        const link = `http//:localhost:3000/invitation/${result.lang}/${result._id}`
        const chatId = await client.getNumberId(number)
        
        if (chatId) { await client.sendMessage(chatId._serialized, link) }
        else {console.log(number, 'Mobile is not registered')}
        
        response.status(200).json(result)
    })
      .catch( error => console.log(error))
}

module.exports = {getInvitationGenerator, postInvitationGenerator}