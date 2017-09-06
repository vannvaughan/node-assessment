const userData = require('./userData.json')

module.exports = {

	getUsers: (req, res, next) => {
        let users = userData
        let filter = req.query
        if (filter.age){
            users = users.filter(function(value){
                return value.age < filter.age
            });
        }
        if (filter.lastname){
            users = users.filter(function(value){
                return value.lastName == filter.lastname
            });
        }
        if (filter.email){
            users = users.filter(function(value){
                return value.email == filter.email
            });
        }
        if (filter.favorites){
            users = users.filter(function(value){
                return value.favorites.includes(filter.favorites)
            });
        }        
        return res.status(200).json(users)
    },
    getUserId: (req, res, next) => {
        let users = userData
        let userId = req.params.userId        
        if ( userId ) {
            for ( var i=0; i<users.length; i++){
                if(users[i].id == userId){
                    users = users[i]
                    return res.status(200).json(users)
                } else {
                    return res.status(404).json(null)
                }
            }
        }
    },
    getAdmins: (req, res, next) => {
        let users = userData.filter(function(value){
            return value.type = "admin"
        })
        return res.status(200).json(users)                
    },
    getNonAdmins: (req, res, next) => {
        let userData = userData.filter(function(value){
            return value.type != "admin"
        })
        return res.status(200).json(userData)                
    },
    getUserType: (req, res, next) => {
        let userType = req.params.userType
        let user = userData.filter(function(value){
            return value.type == userType
        })
        res.status(200).json(user)
    },
    updateUserById: (req, res, next) => {
        let newUser = req.body
        let user = userData
        for (var i=0; i<userData.length; i++){
            if ( userData[i].id == newUser.id){
                userData[i] = newUser
            }
        }
        return res.status(200).json(userData)
    },
    addNewUser: (req, res, next) => {
        let newUser = req.body
        newUser.id = userData.length + 1
        userData.push(newUser)
        return res.status(200).json(userData)
    },
    deleteUser: (req, res, next) => {
        let user = req.params.id
        console.log(user)
        userData.splice(userData.findIndex(function(index){
           return index.id == user
        }), 1)
        return res.status(200).json(userData)
    }
}
