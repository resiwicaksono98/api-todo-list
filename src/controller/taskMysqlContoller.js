const connection = require('../config/mysql')
const path = require('path')
const fs = require('fs')

const getData = (req, res, next) => {
    const { search } = req.query
    let exec = {}
    if (search) {
        exec = {
            sql: 'SELECT * from task WHERE bab LIKE?',
            values: [`%${search}%`]
        }
    }else{
        exec = {
            sql: 'SELECT * from task ',
        }
    }
    connection.query(exec, _response(res))
}

const getDataById = (req, res) => {
    connection.query({
        sql: 'SELECT * from task WHERE id = ?',
        values: [req.params.id]
    }, _response(res))
}

const store = (req, res) => {
    const { bab, sub_bab, end_task } = req.body
    const image = req.file
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        connection.query({
            sql: 'INSERT INTO task (bab,sub_bab,end_task,image_url) VALUES (?,?,?,?)',
            values: [bab, sub_bab, end_task, `http://localhost:5000/public/${image.originalname}`]
        }, _response(res))
    }
}

const update = (req, res) => {
    const { bab, sub_bab, end_task } = req.body
    const image = req.file
    let sql = ''
    let values = []
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        sql = 'UPDATE task SET bab=?,sub_bab=?,end_task=?,image_url=? WHERE id=?'
        values = [bab, sub_bab, end_task, `http://localhost:5000/public/${image.originalname}`, req.params.id]
    } else {
        sql = 'UPDATE task SET bab=?,sub_bab=?,end_task=?, WHERE id=?',
            values = [bab, sub_bab, end_task, req.params.id]
    }
    connection.query({ sql, values }, _response(res))
}

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE from task WHERE id = ?',
        values: [req.params.id]
    }, _response(res))
}

const _response = (res) => {
    return (error, results) => {
        if (error) {
            res.status(400).send({
                status: 'Failed',
                response: error
            })
        } else {
            res.status(200).send({
                status: 'Success',
                response: results
            })
        }
    }
}

module.exports = { getData, getDataById, store, update, destroy }