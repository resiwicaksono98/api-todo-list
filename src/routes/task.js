const express = require('express')

const router = express.Router()

router.get('/task', (req,res,next) => {
    res.status(200).json({
        message: 'Task Berhasil Di Dapat',
        data: {
            bab: 'reacjs',
            subBab: 'State Management Redux'
        }
    })
})

router.get('/task/:bab', (req,res,next) => {
    const {bab} = req.params
    res.status(200).send({
        message: 'Succes status (200)',
        data: {
            bab: bab,
            subBab: `Tentang ${bab}`
        }
    })
})
router.get('/task/:bab', (req,res,next) => {
    const {bab} = req.params
    res.status(200).send({
        message: 'Succes status (200)',
        data: {
            bab: bab,
            subBab: `Tentang ${bab}`
        }
    })
})

module.exports=router