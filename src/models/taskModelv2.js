const moongose = require('mongoose')
const {Schema} = moongose

const task = new Schema({
    bab: String,
    sub_bab: String,
    end_task: Boolean,
    image_url: String

}, {
    timestamps: true
})

module.exports= moongose.model('task', task)