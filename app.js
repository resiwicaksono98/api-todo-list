const express = require('express')
const res = require('express/lib/response')


const app = express()
const taskRoutes = require('./src/routes/task')

app.use(taskRoutes)
app.get('/', (req,res,next) => {
    res.status(201).json({
        message: 'List Api',
        data: {
            1: '/task',
            2: '/task/:bab'
        }
    })
})

app.get('*',(req,res,next) => {
    res.status(404).send({
        message: 'Status 404 Page Not Found'
    })
})

app.listen(process.env.PORT || 5000, () => console.log('Running in http://localhost:4000'))