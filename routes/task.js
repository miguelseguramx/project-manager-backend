const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth')

// api/tasks
// Add new task
router.post('/', 
  [
    check('name', 'The name of the task is required').not().isEmpty(),
    check('project', 'The project is required').not().isEmpty(),
  ],
  auth,
  taskController.createTask
);

// Get all the tasks from an author
router.get('/', 
  auth,
  taskController.getTasks
);

// Update a task
router.put('/:id', 
  auth,
  taskController.updateTask
);

// Delte a task
router.delete('/:id', 
  auth,
  taskController.deleteTask
);

module.exports =  router