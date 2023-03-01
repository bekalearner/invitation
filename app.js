// ---------------MODULES--------------
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const invitationGenerator = require('./routes/inivtation-generator-route')
const invitationList = require('./routes/invitation-list-route')
const invitation = require('./routes/invitation-route')
const invitationApi = require('./routes/invitation-generator-api-route')
const client = require('./helpers/whatsapp-client')
const { errorMsg, successMsg } = require('./helpers/terminal-chalk')


// -------------SERVER--------------


const app = express()


app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(successMsg(`Listening port: ${process.env.PORT}`))
})
app.set('view engine', 'ejs')


// ----------------DATABASE-------------

mongoose
  .connect(process.env.MONGO_URL)
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