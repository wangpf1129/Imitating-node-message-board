const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const Schema = mongoose.Schema

let userSchema = new Schema({
    email: { //邮箱
        type: String,
        required: true
    },
    nickname: { // 昵称
        type: String,
        required: true
    },
    password: { // 密码
        type: String,
        required: true
    },
    created_time: { // 创建时间 
        type: Date,
        //  Date.now 不能带小括号 否则会立刻执行
        default: Date.now
    },
    last_modified_time: { // 最后修改时间
        type: Date,
        default: Date.now
    },
    avatar: { // 头像
        type: String,
        default: '/public/img/avatar-max-img.png'
    },
    bio: { // 介绍
        type: String,
        default: ''
    },
    gender: { // 性别
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: { // 生日
        type: Date
    },
    status: {
        type: Number,
        // 0  没有权限限制
        // 1   不可以评论
        // 2   不可以登录
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)