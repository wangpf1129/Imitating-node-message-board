const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const Schema = mongoose.Schema

let topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    },
    type: {
        type: String
    },
    created_time: { // 创建时间 
        type: Date,
        //  Date.now 不能带小括号 否则会立刻执行
        default: Date.now
    },
    last_modified_time: { // 最后修改时间
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Topic', topicSchema)