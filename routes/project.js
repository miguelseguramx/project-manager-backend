const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth')

// api/projects
// Add new project
router.post('/', 
  [
    check('name', 'The name of the project is required').not().isEmpty(),
  ],
  auth,
  projectController.createProject
);

// Get all the projects from an author
router.get('/', 
  auth,
  projectController.getProjects
);

// Update a project
router.put('/:id', 
  auth,
  [
    check('name', 'The name of the project is required').not().isEmpty(),
  ],
  projectController.updateProject
);

// Delte a project
router.delete('/:id', 
  auth,
  projectController.deleteProject
);

module.exports =  router