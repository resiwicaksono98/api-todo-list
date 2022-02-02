const router = require('express').Router()
const Task = require('../models/taskModel')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getTask, getTaskById, createTask, update, destroy } = require('../controller/taskv2Controller')
const upload = multer({dest:'uploads'})

router.get('/task', getTask)
router.get('/task/:id', getTaskById)
router.post('/task',upload.single('image_url'),createTask)
router.put('/task/:id',upload.single('image_url'), update)
router.delete('/task/:id', destroy )

module.exports = router