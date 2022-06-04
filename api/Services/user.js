const User = require("../Models/Users"); 


const createUser = async(user) => {

    return await new User ({
        name:user.displayName,
        googleid:user.id
    }).save()
}

const findOne = async(user) => {
    return  await User.findOne({googleid:user.id})
}

const findById = async(user) => {
    return await User.findById(user)
}

module.exports = {createUser,findOne,findById}; 