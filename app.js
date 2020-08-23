const express = require('express')
const app = express()
const path = require('path')
const router = require('./router')
const user = require('./routers/user')
const topic = require('./routers/topic')

const bodyParser = require('body-parser')
const session = require('express-session')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))


app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// 配置解析 post 请求体 body  （一定要在  app.use(router) 之前）
// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
    extended: false
}))

// 在 Express 框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件 ： express-session 来解决
//  1.npm install express-session
//  2. 配置 （一定要在  app.use(router) 之前）
//  3. 使用 ：   当把这个插件配置好之后， 我们就可以通过 req.session 来访问和设置 session 成员
//                  添加 Session 数据： req.session.foo = 'bar'
//                  访问 Session 数据： req.session.foo
app.use(session({
    // 配置加密字符串， 它会在原有的加密基础之上 和 这个字符串'node' 拼起来加密
    // 目的是为了增加安全性， 防止客户端恶意伪造
    secret: 'node',
    resave: false,
    saveUninitialized: false // 默认为true  意思是无论你是否使用了 Session， 都默认的直接给你分配一把钥匙
}))

//挂载路由
// app.use(router)
app.use(user)
app.use(topic)

// 配置一个处理 404 的中间件
app.use((req, res) => {
    res.render('404.html')
})

// 配置一个 全局错误处理 中间件  就是 统一处理了 router.js中的   return res.status(500).json({}) 这个错误
// 注意处理错误要有个参数 这时候 req ，res  next 这三个形参不能省略 一旦省略那么err形参就会被错当成这三个参数的一种 
app.use(function (err, req, res, next) {
    console.log('出错了')
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})
app.listen(3000, () => {
    console.log('runing...');
})