# Node综合Web案例
## 1.目录结构
```Javascript
|-- app.js              项目的入口文件
|-- controllers
|-- models
|-- node_modules        第三方包
|-- package.json        包描述文件
|-- package-lock.json   第三方包版本锁定文件（npm 5 以后才有）
|-- public              公共静态资源
|-- README.md           项目说明文档
|-- routes              如果业务比较多，代码量大，最好把路由按照业务分类存储到 routers 目录中
|-- route.js            简单一点的业务 把所有路由都放到这个文件中
|-- viewws              存储视图目录
```

## 2.模板页
- [art-template 子模版和模板继承](https://www.jianshu.com/p/d8d8e19157e0)

## 3.路由设计


| 路径      | 方法 | get 参数 | post 参数               | 是否需要登录 | 备注             |
| --------- | ---- | -------- | ----------------------- | ------------ | ---------------- |
| /         | GET  |          |                         |              | 渲染首页         |
| /register | GET  |          |                         |              | 渲染注册页面     |
| /register | POST |          | email nickname password |              | 处理注册请求     |
| /login    | GET  |          |                         |              | 渲染登录页面     |
| /login    | POST |          | email password          |              | 处理登录请求     |
| /logout   | GET  |          |                         | 是           | 处理退出请求     |
| /settings/profile | GET  |          |                         | 是           | 渲染个人资料页面 |
| /settings/profile | POET |          | email nickname gender brithday   | 是           | 处理修改资料请求 |
| /settings/admin | GET  |          |                         | 是           | 渲染个人账号页面 |
| /settings/admin | POET |          | password   | 是           | 处理修改个人账号请求 |
|/topics/new | GET  |          |                         | 是           | 渲染发布评论页面 |
| /topics/new | POET |          | title、content、type   | 是           | 处理修改评论内容请求 |
| /topics/delete | GET |      id    |    | 是           | 在首页处理删除评论请求 |
| /topics/show | GET |     id     |    | 是           | 渲染评论内容页面 |
## 4.模型设计

## 5.功能实现

## 6.书写步骤
- 创建目录结构
- 整合静态页面-模板页
    - include
    - block
    - extend
- 设计用户登录、退出、注册 等路由
- 用户注册、登录、退出
    - 先处理好客户端页面的内容（表单控件的name、收集表单数据、发送请求）
    - 服务端
        - 获取客户端表单请求数据
        - 操作数据库
        - 如果有错，发送500告诉客户端服务器出错
        - 其他的根据业务需求来发送不同的响应数据

