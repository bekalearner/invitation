const Guest = require('../models/guest')
const client = require('../helpers/whatsapp-client')

const postInvitationGenerator = (request, response) => {
    const {name, phoneNumber, pronoun, lang, link} = request.body

    Guest
      .find()
      .then(guests => {
        new Promise ((resolve, reject) => {
          guests.forEach(guest => {
            if (guest.name.replace(' ', '') == name.replace(' ', '') && guest.phoneNumber == phoneNumber) {
              reject()
            }
          })
          resolve()
        })
        .then(() => {
          new Promise (async (resolve, reject) => {
            const whatsappNumber = await client.getNumberId(phoneNumber.slice(1))
            
            if (whatsappNumber){
              resolve()
            }

            reject()

          })
            .then(() => {
              const invitation = new Guest({name, phoneNumber, pronoun, lang, link})
              invitation
                .save()
                .then(async guest => {
                  let message = ''
                  const number = guest.phoneNumber.slice(1)
                  const link = `${guest.link}/invitation/${guest.lang}/${guest._id}`
                  const chatId = await client.getNumberId(number)

                  if (guest.lang === 'kg') {
                    message = `Кубанычыбызга шериктеш болуп 😊, чакыруубузду кабыл алыңыз . Бисмиллях 💐👇 \n\n${link}`
                  } else if (guest.lang == 'ru') {
                    message = `Разделите с нами радость неповторимого для нас дня 😊 – дня свадьбы наших детей 💐👇 \n\n${link}`
                  }
                  
                  if (chatId) { 
                    await client.sendMessage(chatId._serialized, message) 
                  }
                  else { console.log(number, 'Mobile is not registered') }
                  
                  response.status(200).json({status: 'success'})
                })
                .catch( error => console.log(error))
            })
            .catch(() => {
              response.status(404).json({status: 'fail'})
            })
        })
        .catch(() => {
          response.status(300).json({status: 'fail'})
        })
      })
}

module.exports = { postInvitationGenerator }