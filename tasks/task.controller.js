const taskModel = require('./task.model')
const taskSevice = require('./task.service')
// require('../items/item.model')
require('../users/user.model')

async function create(data) {
   return await taskModel.create(data)
}

async function readAll() {
   // if (isPopItems) {
      return await taskModel.find()
         // .populate('userId')
         // .populate('items.itemId');
   // } else {
      // return await taskModel.find({ ...filter, isActive: true });
   // }
}

async function readFiltered(filter){

}

async function readByUser(userId, isPopItems = true) {
   if (isPopItems) {
      return await taskModel.find(userId)
         .populate('userId')
         // .populate('items.itemId');
   } else {
      return await taskModel.find({ ...filter, isActive: true });
   }
}

async function readOne(filter) {
   return await taskModel.findOne(filter)
      // .populate('userId')
      // .populate('tasks.taskIdId')
}


async function updateById(id,data){
   return await taskModel.updateOne({_id:id},data)
}

async function deleteSingleTask(id){
   return await taskModel.deleteOne({_id:id})
}

async function deleteMany(filter){
   return await taskModel.deleteMany(filter)
}

module.exports = { create, readAll, readOne, updateById, readByUser, readFiltered,deleteSingleTask, deleteMany }
