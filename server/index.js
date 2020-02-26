require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const mongoose = require('mongoose')

const authCtrl = require('./controllers/authController')

const chalk = require('chalk')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, MONGO_CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.userInfo)

mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(dbInstance => {
    app.set('mdb', dbInstance)
    console.log(chalk.blue('mongo db connected'))
})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log(chalk.cyan('postgresql db connected'))
    app.listen(SERVER_PORT, () => console.log(chalk.green(`Listening on port ${SERVER_PORT}`)))
  })
  .catch(err => console.log(chalk.red(err)));
