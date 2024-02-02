const taskController = require("./task.controller");
const usersController = require("../users/user.controller");
const taskModel = require('./task.model')
const userModel = require('../users/user.model')
const moment = require('moment');

// let data = {
//   userId: "65afda92031702a7e64dabc3",
//   tasks: {
//     "65a7d3ec1a89c6edce167955": 5,
//     "65a7d3ec1a89c6edce167960": 3,
//     "65a7d3ec1a89c6edce16796f": 1,
//   },
// };

async function getAlltasks() {
  try {
    const tasks = await taskController.readAll();
    return tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }}

async function getFilteredTasks(filter) {
  try {
    const tasks = await taskController.readFiltered(filter);
    return tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
}

async function getTask(taskId) {
  try {
    const task = await taskController.readOne({ _id: taskId });
    if (!task) {
      throw new Error("task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to fetch task ${taskId}: ${error.message}`);
  }
}

async function gettasksByUser(userId){
  try {
    const tasks = await taskController.readByUser({ _id: userId });
    if (!tasks) {
      throw new Error("task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to fetch tasks by user: ${userId}: ${error.message}`);

  }
}

async function addNewtask(data) {
  try {
    console.log(data);
    
    if (!data) {
      throw new Error('Task data is missing');
    }

    let user = await usersController.readOne({ _id: data.userId })
    // .populate();
    if (!user) {
      throw new Error('User not found');
    }
    
    const taskInfo = {
      userId: data.userId,
      // taskId: data.taskId, 
      taskToDoDate : moment(data.taskToDoDate, 'YYYY-M-D').toDate(),
      text: data.text 
    };

    let newTask = await taskController.create(taskInfo);
    if (!user.tasks) {
      user.tasks = [];
    }
    console.log(newTask);
    // const newData = user.tasks.push(task);
    user.tasks.push(newTask);

    user =  await usersController.updateById(user._id, { tasks: user.tasks })
    user = await userModel.findById(user._id).populate('tasks.task');

    // user = userModel.findOne(user.userName).populate('tasks taskId')

    console.log(user);
    return newTask
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
}



async function updateTask(taskId, data){
  const existingtask = await taskController.readOne({ _id: taskId });
if (!existingtask) throw "task doesnt exists";
let updatedtask = await taskController.updateById(taskId, data)
//  await taskController.readOne({ _id: taskId });
return updatedtask
}


async function deleteSingleTask(taskId){
  const existingtask = await taskController.readOne({ _id: taskId });
  if (!existingtask) throw "task doesnt exists";
 return await taskController.deleteSingleTask(taskId)
}

async function deleteMany(filter){
  return await taskController.deleteMany(filter)
  user =  await usersController.updateById(user._id, { tasks: user.tasks })
}

async function updateMany(filter){

}

module.exports = { addNewtask, getAlltasks , getTask , getFilteredTasks , updateTask , updateMany , deleteSingleTask , deleteMany , gettasksByUser };
// gettasksByUser, 