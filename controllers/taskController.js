const { json } = require('express')
const Task = require('../models/taskModel')

const getTasks = async (req, res) => {
  const tasks = await Task.find({})

  res.status(200).json(tasks)
}

const setTask = async (req, res) => {

  if (!req.body.text) {
    res.status(400)
    throw new Error('Syötä tapahtuma')
  }

  const task = await Task.create({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder || false,
  })

  res.status(200).json(task)
}

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error("Tapahtumaa ei ole")
  }

  if (!req.body.text || !req.body.day) {
    res.status(400)
    throw new Error('Syötä kaikki pakolliset tiedot')
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
  res.status(200).json(updatedTask)
}

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error("Tapahtumaa ei ole")
  }

  await task.deleteOne()
  res.status(200).json({id: req.params.id})
 
}

module.exports = { getTasks, setTask, updateTask, deleteTask }