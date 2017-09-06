
const express = require('express')
    , port = 3000
    , app = express()
    , bodyParser = require('body-parser')
    , users = require('./userData.json')
    , userCtrl = require('./userCtrl.js')

app.use(bodyParser.json());

app.get('/api/users', userCtrl.getUsers)
app.get('/api/users/:userId', userCtrl.getUserId)
app.get('/api/admins', userCtrl.getAdmins)
app.get('/api/nonadmins', userCtrl.getNonAdmins)
app.get('/api/user_type/:userType', userCtrl.getUserType)
app.put('/api/users/:id', userCtrl.updateUserById)
app.post('/api/users', userCtrl.addNewUser)
app.delete('/api/users/:id', userCtrl.deleteUser)

app.listen(port, function(){
    console.log('TTHHIIISS ISSS MYYY BOOOM STICK!!!')
})