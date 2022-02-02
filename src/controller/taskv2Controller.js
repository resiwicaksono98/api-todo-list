const { ObjectId } = require('mongodb')
const Task = require('../models/taskModelv2')
const fs = require('fs')
const path = require('path')

const getData = async (req, res) => {
    let search = req.query.q
    if (search) {
        await Task.find({ bab: new RegExp(search, "i") })
            .then((result) => res.send({
                message: `Get Data ${search}`,
                data: result
            }))
            .catch(err => res.send(err))
    }
    await Task.find().exec()
        .then((result) => res.send({
            message: 'Get All Data',
            data: result
        }))
        .catch(error => res.send(error))
}

const getById = async (req, res) => {
    const { id } = req.params
    Task.findById(id)
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const store = async (req, res) => {
    const { bab, sub_bab, end_task } = req.body
    const image = req.file

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        await Task.create({ bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` })
            .then((result) => res.send({ message: 'Task Create Successfully', data: result }))
            .catch(err => res.send(err))
    }
}

const update = async (req, res) => {
    const { id } = req.params
    const { bab, sub_bab, end_task } = req.body
    const image = req.file

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        await Task.findByIdAndUpdate({ "_id": id }, { bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` })
            .then((result) => res.send({ message: 'Task Update Successfully', data: result }))
            .catch(err => res.send(err))
    }
    await Task.findByIdAndUpdate({ "_id": id }, { bab, sub_bab, end_task })
        .then((result) => res.send({ message: 'Task Update Successfully', data: result }))
        .catch(err => res.send(err))
}

const destroy = (req, res) => {
    const { id } = req.params
    Task.deleteOne({ _id: id })
        .then((result) => res.send({
            message: `Delete Successfully`,
            data: result,
        }))
        .catch(error => res.send(error))
}

module.exports = { getData, getById, store, destroy, update }