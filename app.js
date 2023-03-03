// ---------------MODULES--------------
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const invitationGenerator = require('./routes/inivtation-generator-route')
const invitationList = require('./routes/invitation-list-route')
const invitation = require('./routes/invitation-route')
const invitationApi = require('./routes/invitation-generator-api-route')
const invitationListApi = require('./routes/invitation-list-api-route')
const qrcode = require('./routes/qrcode-route')
const qrcodeApi = require('./routes/qrcode-api-route')
const client = require('./helpers/whatsapp-client')
const { errorMsg, successMsg } = require('./helpers/terminal-chalk')


// -------------SERVER--------------


const app = express()

const PORT = process.env.PORT || 8080


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(successMsg(`Listening port: ${PORT}`))
})
app.set('view engine', 'ejs')


// ----------------DATABASE-------------

mongoose
  .connect('mongodb+srv://bekalearner:Kalymbibekalearner6519@cluster1.sfshr37.mongodb.net/invitations_wedding')
  .then( response => {
    console.log(successMsg('Connected to Data Base'))
    response.status = 200
})
  .catch( error => console.log(errorMsg(error)))


// ------------MIDDLE-WARES---------------


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))


// -------------ROUTES-----------------


app.use(invitationGenerator)
app.use(invitationList)
app.use(invitation)
app.use(invitationApi)
app.use(invitationListApi)
app.use(qrcode)
app.use(qrcodeApi)
app.use((request, response) => {
  response.status(404).render(`${__dirname}/views/error.ejs`)
})