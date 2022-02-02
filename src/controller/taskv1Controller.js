const { ObjectId } = require('mongodb')
const db = require('../config/mongodb')
const fs = require('fs')
const path = require('path')

const getData = async (req, res) => {
    await db.collection('task').find()
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const getById = async (req, res) => {
    const { id } = req.params

    db.collection('task').find({ _id: ObjectId(id) })
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const store = async (req, res) => {
    const { bab, sub_bab, end_task } = req.body
    const image = req.file

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        await db.collection('task').insertOne({ bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` })
            .then(result => res.send(result))
            .catch(err => res.send(err))
    }
}

const update = async (req, res) => {
    const { bab, sub_bab, end_task } = req.body
    const image = req.file
    const { id } = req.params

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        await db.collection('task').updateOne({"_id": ObjectId(id)},{$set: { bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` }},  )
            .then(result => res.send(result))
            .catch(err => res.send(err))
    }
}

const destroy = (req, res) => {
    const { id } = req.params

    db.collection('task').deleteOne({ _id: ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports = { getData, getById, store, update, destroy }