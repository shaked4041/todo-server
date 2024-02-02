const userModel = require('./user.model')
// const orderModel = require('../tasks/task.model')
// require('../items/item.model')
// require('../tasks/task.model')

async function create(data){
    return await userModel.create(data)
}

async function read(){
   return await userModel.find()
}

// async function read(filter={}){
//    return await userModel.find({...filter,isActive : true})
// }

async function readOne(filter){
   return await userModel.findOne(filter)
}

async function updateById(id,data){
    return await userModel.updateOne({_id:id},data)
}

// async function del(id){
//     return await updateById({_id: id},{isActive:false})
// }


module.exports = {create,read,readOne,updateById}
