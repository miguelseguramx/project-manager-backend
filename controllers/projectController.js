const Project = require('../models/Project');
const { validationResult } = require('express-validator')

exports.createProject = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  try{
    const project = new Project(req.body)

    // Save the author
    project.author = req.user.id

    // Save the project
    project.save();
    res.status(200).json(project)

  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}

exports.getProjects = async ( req, res ) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  try {
    const projects = await Project.find({ author: req.user.id }).sort({ date: -1})
    res.json({ projects})
  } catch (error) {
    console.log(error)
    res.status(500).send('There was a mistake')
  }
}

exports.updateProject = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  const { name } = req.body;
  const newProject = {};

  if(name){
    newProject.name = name
  }

  try {
    
    // Check the id
    let project = await Project.findById(req.params.id)
    
    // Check if the project exist 
    if(!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    console.log(project)
    // Check the author
    if(project.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    // Update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id }, { $set: newProject}, { new: true})

    res.json({ project })

  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}

exports.deleteProject = async ( req, res ) => {

  
  try {

    // Check the id
    let project = await Project.findById(req.params.id)
      
    // Check if the project exist 
    if(!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    // Check the author
    if(project.author.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'No authorized' })
    }

    // Delete
    await Project.findOneAndRemove({ _id: req.params.id })

    res.status(200).json({ msg: 'Project deleted' })
    
  } catch (error) {
    console.log(error);
    res.status(500).send('There was a mistake')
  }
}