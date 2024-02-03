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
         .populate('userId').populate('task')
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
async function deleteOne(taskId) {
   try {
     // Check if the task exists
     const existingTask = await taskModel.findById(taskId);
     if (!existingTask) throw new Error('Task not found');
 
     // Delete the task
     await taskModel.deleteOne({ _id: taskId });
 
     return { message: 'Task deleted successfully' };
   } catch (error) {
     throw new Error(`Failed to delete task: ${error.message}`);
   }
 }


async function deleteMany(filter){
   return await taskModel.deleteMany(filter)
}

module.exports = { create, readAll, readOne, updateById, readByUser, readFiltered,deleteOne, deleteMany }
