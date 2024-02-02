const express = require('express')
const router = express.Router()
const userService = require('./user.service')
// const auth = require('../auth'); 
// const { checkIfToken } = require('../auth');


// localhost:2500/user

// get all users
router.get('/', async (req, res) => {
   try {
       const users = await userService.getAllUsers();
       res.json(users);
   } catch (error) {
       console.error(error);
       res.status(500).send(error || 'something went wrong');
   }
});


// get single user
router.get('/:userId', async (req, res) => {
   try {
      const user = await userService.getUser(req.params.id);
      if (!user) {
         res.status(404).json({ error: 'User not found' });
         return;
      }
      res.json(user);
   } catch (error) {
      console.error(error);
      res.status(error.status || 500).send(error?.msg || 'Error occurred');
   }
})

router.get('/:userId/tasks', async (req, res) => {
   try {
      const orders = await userService.getUsertasks(req.params.userId);
      res.json(orders);
   } catch (error) {
      console.error(error);
      res.status(error.status || 500).send(error?.msg || 'Error occurred');
   }
})

router.post('/', async (req, res) => {
   try {
      const newUser = await userService.addNewUser(req.body)
      res.status(201).json(newUser);
   } catch (error) {
      console.error(error);
      res.status(500).send(error || 'something went wrong')
   }
})


router.put('/:userId', async (req, res) => {
   try {
      const { userId } = req.params;
      const updatedUser = await userService.updateUser(userId, req.body);
      if (!updatedUser) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      res.json(updatedUser); 
   } catch (error) {
      console.error('Error in updateUser route:', error);
      res.status(error.status || 500).send(error?.msg || 'something went wrong')
   }
})


module.exports = router