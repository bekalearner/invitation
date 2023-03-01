const Guest = require('../models/guest')
const client = require('../helpers/whatsapp-client')

const postInvitationGenerator = (request, response) => {
    const {name, phoneNumber, pronoun, lang} = request.body

    Guest
      .find()
      .then(guests => {
        new Promise ((resolve, reject) => {
          guests.forEach(guest => {
            if (guest.name == name && guest.phoneNumber == phoneNumber) {
              reject()
            }
          })
          resolve()
        })
        .then(() => {
          const invitation = new Guest({name, phoneNumber, pronoun, lang})
          invitation
            .save()
            .then(async result => {
              // const number = result.phoneNumber.slice(1)
              // const link = `http//:localhost:3000/invitation/${result.lang}/${result._id}`
              // const chatId = await client.getNumberId(number)
              
              // if (chatId) { await client.sendMessage(chatId._serialized, link) }
              // else {console.log(number, 'Mobile is not registered')}
              
              response.status(200).json({status: true})
            })
            .catch( error => console.log(error))
        })
        .catch(() => {
          console.log('Same guest')
          response.status(300).json({status: false})
        })
      })
}

module.exports = { postInvitationGenerator}