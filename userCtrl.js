const userData = require('./userData.json')

module.exports = {

	getUsers: (req, res, next) => {
        let users = userData
        if (req.query.age){
            let users = userData.filter(function(value){
                if( value.age < req.query.age ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.lastname){
            let users = userData.filter(function(value){
                if( value.last_name == req.query.lastname ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.email){
            let users = userData.filter(function(value){
                if( value.email == req.query.email ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.favorites){
            let users = userData.filter(function(value){
                if( value.favorites.includes(req.query.favorites) ){
                    return value
                }
            });
            return res.status(200).json(users)
        }        
        return res.status(200).json(userData)
    },
    getUserId: (req, res, next) => {
        let users = userData
        let userId = req.params.userId        
        if ( userId ) {
            for ( var i=0; i<users.length; i++){               
                if(users[i].id == userId){
                    users = users[i]
                    return res.status(200).json(users)
                } 
            }
            return res.status(404).json(null)
        }
    },
    getAdmins: (req, res, next) => {
        let users = userData.filter(function(value){
            if(value.type == "admin"){
                return value
            }
        })
        return res.status(200).json(users)                
    },
    getNonAdmins: (req, res, next) => {
        let users = userData.filter(function(value){
            return value.type != "admin"
        })
        return res.status(200).json(users)                
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
        userData.splice(userData.findIndex(function(index){
           return index.id == user
        }), 1)
        return res.status(200).json(userData)
    }
}
