const express = require('express');
const home = require('../controller/home');
const handle = require('../controller/handle');

const router = express.Router();

module.exports = function(app) {
    router.get('/', home.index);
    router.get('/login', home.login);
    router.get('/register', home.register);
    router.get('/contact', home.contact);
    router.get('/setting', home.setting);
    router.get('/notice', home.notice);
    router.get('/testManage', home.testManage);
    router.get('/testAdd', home.testAdd);
    router.get('/userManage', home.userManage);
    router.get('/noticeSend', home.noticeSend);
    router.get('/userDelete', home.userDelete);
    router.get('/userUpdate', home.userUpdate);
    router.get('/test', home.test);
    router.get('/testShow', home.testShow);
    router.get('/testDelete', home.testDelete);
    router.get('/testAnalyze', home.testAnalyze);
    router.get('/record', home.record);
    router.get('/recordAdmin', home.recordAdmin);
    router.get('/noticeList', home.noticeList);
    router.get('/noticeShowAdmin', home.noticeShowAdmin);
    router.get('/notices', home.notices);
    router.get('/reply', home.reply);
    router.get('/noticeDelete', home.noticeDelete);

    router.post('/register', handle.register);
    router.post('/login', handle.login);
    router.post('/userUpdateAdmin', handle.userUpdateAdmin);
    router.post('/userUpdate', handle.userUpdate);
    router.post('/testAdd', handle.testAdd);
    router.post('/submit', handle.submit);
    router.post('/notice', handle.notice);
    router.post('/noticeSend', handle.noticeSend);
    app.use(router);
};