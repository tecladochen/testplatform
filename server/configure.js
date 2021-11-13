const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
//用于解析客户端请求的中间件
const bodyParser = require('body-parser');
//用于收发cookie
const cookieParser = require('cookie-parser');
//记录日志的中间件
const morgan = require('morgan');
//为老的浏览器提供REST请求的兼容性支持
const methodOverride = require('method-override');
// 用于错误打印，开发场景下使用
const errorHandler = require('errorhandler');
// 路由配置信息
const routes = require('./routes');
const session = require('express-session');

module.exports = function(app) {
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(cookieParser('session-user'));
    app.use(session({
        secret: 'session-user',
        resave: true,
        saveUninitialized: true
    }));
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if (app.get('env') === 'development') {
        app.use(errorHandler());
    }
    routes(app);
    return app;
};