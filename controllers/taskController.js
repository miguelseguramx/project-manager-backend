const Task = require('../models/Task');
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
  // Look for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }
  
  try{
    const { project } = req.body
    const existProject = await Project.findById(project)

    if(!existProject) {
      return res.status(404).json({msg: 'Project not found'})
    }

    // Check the author of the project and the actual guy to be the same
    if(existProject.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    // Create new task
    const task = new Task(req.body)

    // Save the project
    task.save();
    res.status(200).json({ task })

  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}

// Get all the task from a project
exports.getTasks = async ( req, res ) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }
  
  try {

    const { project } = req.body
    const existProject = await Project.findById(project)

    if(!existProject) {
      return res.status(404).json({msg: 'Project not found'})
    }

    // Check the author of the project and the actual guy to be the same
    if(existProject.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    const tasks = await Task.find({ project }).sort({ date: -1})
    res.json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was a mistake')
  }
}

exports.updateTask = async (req, res) => {
  try {
    // Extract the project and check if exist
    const { project, name, state } = req.body
    
    const exist = await Task.findById(req.params.id)
    if(!exist) {
      return res.status(404).json({msg: 'Task not found'})
    }
    
    // Check the author of the project and the actual guy to be the same
    const existProject = await Project.findById(project)
    console.log(existProject);
    if(existProject.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    // Create an object with the new information
    const newTask = {}
    if(name) newTask.name = name;
    if(state) newTask.state = state;
    
    const task = await Task.findOneAndUpdate({_id : req.params.id }, newTask, { new: true})

    res.json({ task })

  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}

exports.deleteTask = async (req, res) => {
  try {
    // Extract the project and check if exist
    const { project } = req.body
    
    const exist = await Task.findById(req.params.id)
    if(!exist) {
      return res.status(404).json({msg: 'Task not found'})
    }
    
    // Check the author of the project and the actual guy to be the same
    const existProject = await Project.findById(project)
    console.log(existProject);
    if(existProject.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    // Delete
    await Task.findOneAndRemove({_id : req.params.id });

    res.json({msg: 'Task deleted'})

  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}
