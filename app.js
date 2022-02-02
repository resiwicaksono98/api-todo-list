require('./src/config/mongoose')
const express = require('express')
const logger = require('morgan')
const taskv1 = require('./src/routes/taskv1')
const taskv2 = require('./src/routes/taskv2')
const path = require('path')
const cors = require('cors')



const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1/', taskv1)
app.use('/api/v2/', taskv2)


app.get('*', (req, res, next) => {
    res.status(404).send({
        message: 'Status 404 Page Not Found'
    })
})

app.listen(process.env.PORT || 5000, () => console.log('Running in http://localhost:5000'))