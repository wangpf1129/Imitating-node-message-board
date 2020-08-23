const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Topic = require('../models/topic')
const users = require('../routers/user')
const md5 = require('blueimp-md5')


//  首页页码 评论信息页面
router.get('/page/choose', (req, res) => {
    const num = parseInt(req.query.num, 10);
    console.log(num);
    const startNum = (num - 1) * 6;
    const endNum = startNum + 6;
    Topic.find((err, data) => {
        if (err) {
            return res.end('Server Error');
        }
        data = data.slice(startNum, endNum);
        res.json({
            topic: data
        });
    })

})

// 渲染 添加 评论页面
router.get('/topics/new', (req, res) => {
    res.render('topic/new.html', {
        user: req.session.user
    });
})

//  评论信息请求
router.post('/topics/new', (req, res) => {
    var body = req.body;
    new Topic(body).save((err, data) => {
        if (err) {
            return res.end('Server Error');
        }
        res.redirect('/');
    })
})

//  删除评论信息请求
router.get('/topics/delete', (req, res) => {
    // 1. 在客户端的列表页中处理链接问题 （需要有 id 的参数）
    // 2. 获取要编辑的 id
    // 3. 渲染编辑页面   
    //   根据id 把学生信息查出来
    //   使用模板引擎来渲染页面
    Topic.findByIdAndRemove(req.query.id, (err, student) => {
        // req.query.id 是字符串 而我们要的 id 是个 数字型 所以要转换
        if (err) {
            return res.status(500).send('Server err..')
        }
        res.redirect('/')
    })
})

//  渲染查看评论信息页面
router.get('/topics/show', (req, res) => {
    let user = req.session.user
    if (user) {
        Topic.findOne({
            _id: req.query.id
        }, (err, data) => {
            if (err) {
                throw (err);
            }
            res.render('topic/show.html', {
                topic: data,
                user: user
            })
        })
    } else {
        res.redirect('/login')
    }
})


module.exports = router