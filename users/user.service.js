const userController = require('./user.controller')
// const mongoose = require('mongoose')
const taskModel = require('../tasks/task.model')
const userModel = require('../users/user.model')
// require('../items/item.model')
require('./user.model')



async function getAllUsers() {
  try {
      // const users = await userModel.find({ isActive: true });
      const users = await userController.read();
      return users;
  } catch (error) {
      throw error;
  }
}


function getUser(filter) {
    return userController.readOne(filter)
}

// function getUser(userId) {
//     return userController.readOne({_id:userId})
// }


async function getUserOrders(userId) {
    try {
        const orders = await userController.read({_id: userId }).populate('items');
        return orders;
    } catch (error) {
        throw error;
    }
}



// validation fields
// email is not exist
// create new user (db)
// .
// .
// .
// return newUser

const addNewUser = async(data) =>{
  if (Object.keys(data).length !== 3) throw "missing data";
  if (
    Object.keys(data).filter(
      (key) =>
      !(
            key === "userName" ||
            key === "email" ||
            key === "password"
            )
            ).length > 0
            )
            throw "key did not exist";
            const existingUser = await userController.readOne({ email: data.email });
            if (existingUser) throw "user already exists";
            let newUser = userController.create(data)
            return newUser;
          }
    
          
          
 async function updateUser(userId, data){
  const existingUser = await userController.readOne({ _id: userId });
  if (!existingUser) throw "user doesnt exists";
  let updatedUser = await userController.updateById(userId, data)
  // await userController.readOne({ _id: userId });
  return updatedUser
}


module.exports = { getAllUsers, getUser, addNewUser, updateUser, getUserOrders };
