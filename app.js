// ---------------MODULES--------------
const express = require('express')
const mongoose = require('mongoose')
const invitationGenerator = require('./routes/inivtation-generator-route')
const invitation = require('./routes/invitation-route')


// -------------SERVER--------------


const app = express()

const config = {PORT: 3000, HOST: 'localhost'}
const { PORT, HOST } = config

app.listen(PORT, HOST, (error) => {
    error ? console.log(error) : console.log(`Listening port: ${PORT}`)
})
app.set('view engine', 'ejs')


// ----------------DATABASE-------------


const db = 'mongodb+srv://bekalearner:Kalymbibekalearner6519@cluster1.sfshr37.mongodb.net/invitations'

mongoose
  .connect(db)
  .then( response => {
    console.log('Connected to db')
    response.status = 200
})
  .catch( error => console.log(error))


// ------------MIDDLE-WARES---------------


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))


// -------------ROUTES-----------------


app.use(invitationGenerator)
app.use(invitation)