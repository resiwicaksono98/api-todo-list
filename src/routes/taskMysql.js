const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const { getData, getDataById, store, update, destroy } = require('../controller/taskContoller')


const router = express.Router()

router.get('/task', getData)
router.get('/task/:id', getDataById )
router.post('/task/', upload.single('image_url'), store)
router.put('/task/:id',upload.single('image_url'), update)
router.delete('/task/:id',upload.single('image_url'), destroy)

module.exports = router