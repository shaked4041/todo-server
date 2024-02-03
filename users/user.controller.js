const userModel = require('./user.model')
// const orderModel = require('../tasks/task.model')
// require('../items/item.model')
require('../tasks/task.model')

async function create(data){
    return await userModel.create(data)
}

async function read(){
   return await userModel.find()
}

// async function read(filter={}){
//    return await userModel.find({...filter,isActive : true})
// }

async function readOne(userId){
    return await userModel.findOne(userId).populate('tasks');
   
}

async function readById(userId){
    return await userModel.findOne(userId)
   
}



async function updateById(id,data){
    return await userModel.updateOne({_id:id},data)
}

async function deleteUser(id){
    // return await updateById({_id: id},{isActive:false})
    let result = await userModel.deleteOne({_id:id })
    return result
}


module.exports = {create,read,readOne,updateById,deleteUser,readById}
