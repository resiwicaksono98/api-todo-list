const Task = require('../models/taskModel')
const path = require('path')
const fs = require('fs')
const sequelize = require('../config/sequelize')

const getTask = async (req, res) => {
    let lookupValue = req.query.search
    if (lookupValue) {
        const task = await Task.findAll({
            where: {
                bab: sequelize.where(sequelize.fn('LOWER', sequelize.col('bab')), 'LIKE', '%' + lookupValue + '%')
            }
        });
        res.status(200).send({
            message: "Get Task Success",
            result: task
        })
        // sql: 'SELECT * from task WHERE bab LIKE?',
        // values: [`%${search}%`]
    } else {
        const task = await Task.findAll();
        res.status(200).send({
            message: "Get Task Success",
            result: task
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findAll({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send({
            message: `Get Task By Id `,
            result: task
        })
    } catch (e) {
        res.send(e)
    }
}

const createTask = async (req, res) => {
    const { user_id, bab, sub_bab, end_task } = req.body
    let image = req.file
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        try {
            await Task.sync()
            const result = await Task.create({ user_id, bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` })
            res.status(200).send({
                message: 'Create Task Successfully',
                result: result
            })
        } catch (e) {
            res.send(e)
        }
    }


}

const update = async (req, res) => {
    const { user_id, bab, sub_bab, end_task } = req.body
    let image = req.file
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        try {
            await Task.sync()
            const result = await Task.update({ user_id, bab, sub_bab, end_task, image_url: `http://localhost:5000/public/${image.originalname}` }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({
                message: 'Update Task Successfully',
                result: result
            })
        } catch (e) {
            res.send(e)
        }
    }
}

const destroy = async (req, res) => {
    try {
        const task = await Task.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            message: `Delete Task Successfully `,
            result: task
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getTask, getTaskById, createTask, update, destroy }