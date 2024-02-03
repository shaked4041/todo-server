const userController = require('./user.controller')
const userModel = require('../users/user.model')
 require('../tasks/task.model')



async function getAllUsers() {
  try {
      const users = await userController.read();
      return users;
  } catch (error) {
      throw error;
  }
}



async function getUser(userId) {
  try {
      const user = await userController.readOne(userId)
      return user;
  } catch (error) {
      throw new Error(`Failed to fetch user ${userId}: ${error.message}`);
  }
}


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


async function deleteUser(userId){
  const user = await userController.readById( userId);
  if (!user) throw "user doesnt exists";

  if(!user.tasks){
    return await userController.deleteUser(userId)
  }
  
}


module.exports = { getAllUsers, getUser, addNewUser, updateUser,deleteUser };
