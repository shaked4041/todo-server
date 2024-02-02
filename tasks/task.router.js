const express = require("express");
const router = express.Router();
const taskService = require("./task.service");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const results = await taskService.addNewtask(req.body);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'something went wrong');
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAlltasks()
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'something went wrong');
  }
});

router.get("/:taskId", async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.taskId);
    if (!task) throw "task not found";
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'something went wrong');
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const tasks = await taskService.gettasksByUser(req.params.userId);
    if (!tasks) throw "tasks not found";
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'something went wrong');
  }
});




router.put('/:taskId', async (req, res) => {
  try {
     const { taskId } = req.params;
     const updatedtask = await taskService.updateTask(taskId, req.body);
     if (!updatedtask) {
         res.status(404).json({ error: 'task not found' });
         return;
     }
     res.json(updatedtask); 
  } catch (error) {
     console.error('Error in updatetask route:', error);
     res.status(error.status || 500).send(error?.msg || 'something went wrong')
  }
})


router.delete('/:taskId', async (req, res)=>{
  try {
    const {taskId} = req.params;
   let result =  await taskService.deleteSingleTask(taskId)
     res.json(result)
  } catch (error) {
    res.status(error.status || 500).send(error?.msg || 'something went wrong')
  }
})

router.delete('/', async (req, res)=>{
  try {
   let result =  await taskService.deleteMany(req.body)
     res.json(result)
  } catch (error) {
    res.status(error.status || 500).send(error?.msg || 'something went wrong')
  }
})

module.exports = router;