const User = require('../models/user');
const Test = require('../models/test');
const Record = require('../models/record');
const Notice = require('../models/notice');

module.exports = {

    register: function(req, res) {
        const param = {};
        param.email = req.body.email;
        param.password = req.body.password;
        const user = new User(param);
        user.save(function(err) {
            if (err) return handleError(err);
        });
        req.session.userEmail = param.email;
        res.redirect('/');
    },
    login: function(req, res) {
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) return handleError(err);
            if (user) {
                if (req.body.password != user.password) {
                    res.render('passError', { layout: false });
                } else {
                    req.session.userEmail = user.email;
                    if (user.email == 'tecladochen@gmail.com') {
                        res.redirect('/testManage');
                    } else {
                        res.redirect('/');
                    }
                }
            } else {
                res.render('emailErr', { layout: false });
            };
        });
    },
    userUpdateAdmin: function(req, res) {
        const news = {};
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) return handleError(err);
            if (user) {
                news.email = user.email;
                news.password = req.body.password == user.password ? user.password : req.body.password;
                news.text = req.body.text == user.text ? user.text : req.body.text;
                User.updateOne({ email: news.email }, { $set: news }, function() {
                    res.redirect('/userManage');
                });
            }
        });
    },
    userUpdate: function(req, res) {
        const news = {};
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) return handleError(err);
            if (user) {
                news.email = user.email;
                news.password = req.body.password == user.password ? user.password : req.body.password;
                news.text = req.body.text == user.text ? user.text : req.body.text;
                User.updateOne({ email: news.email }, { $set: news }, function() {
                    res.redirect('/');
                });
            }
        });
    },
    testAdd: function(req, res) {
        const param = {
            title: req.body.title,
            text: req.body.text,
            content: [{
                question: req.body.a_question,
                selectA: req.body.a_questionA,
                selectB: req.body.a_questionB,
                selectC: req.body.a_questionC,
                selectD: req.body.a_questionD,
                answer: req.body.a_answer,
                analyze: req.body.a_analyze,
            }, {
                question: req.body.b_question,
                selectA: req.body.b_questionA,
                selectB: req.body.b_questionB,
                selectC: req.body.b_questionC,
                selectD: req.body.b_questionD,
                answer: req.body.b_answer,
                analyze: req.body.b_analyze,
            }, {
                question: req.body.c_question,
                selectA: req.body.c_questionA,
                selectB: req.body.c_questionB,
                selectC: req.body.c_questionC,
                selectD: req.body.c_questionD,
                answer: req.body.c_answer,
                analyze: req.body.c_analyze,
            }],
        };
        const test = new Test(param);
        test.save(function(err) {
            if (err) return handleError(err);
            res.redirect('/testManage');
        });
    },
    submit: function(req, res) {
        const viewModel = {
            layout: 'main',
            test: {
                email: req.session.userEmail,
                title: req.query.title,
                content: [],
            },
        }
        const date = new Date();
        const param = {
            email: viewModel.test.email,
            title: viewModel.test.title,
            answer: req.body.answer
        };
        Test.findOne({ title: param.title }, 'content', function(err, test) {
            if (err) return handleError(err);
            if (test) {
                let score = 0;
                test.content.forEach(function(elem, index) {
                    if (param.answer[index] == elem.answer) {
                        score = score + 30;
                    }
                    const temp = {};
                    temp.question = elem.question;
                    temp.selectA = elem.selectA;
                    temp.selectB = elem.selectB;
                    temp.selectC = elem.selectC;
                    temp.selectD = elem.selectD;
                    temp.answer = param.answer[index];
                    temp.answerCurrent = elem.answer;
                    temp.analyze = elem.analyze;
                    viewModel.test.content.push(temp);
                });
                score = score + 10;
                param.score = score;
                viewModel.test.score = param.score;
                const record = new Record(param);
                record.save(function(err) {
                    if (err) return handleError(err);
                    // 定位到试卷结果页面
                    res.render('result', viewModel);
                });
            }
        });
    },
    notice: function(req, res) {
        const param = {
            email: req.body.email,
            topic: req.body.topic,
            content: req.body.content,
            accept: 'tecladochen@gmail.com'
        };
        const notice = new Notice(param);
        notice.save(function(err) {
            if (err) return handleError(err);
            res.redirect('/');
        });
    },
    noticeSend: function(req, res) {
        const param = {
            email: 'tecladochen@gmail.com',
            topic: req.body.topic,
            content: req.body.content,
            accept: req.body.accept
        };
        const notice = new Notice(param);
        notice.save(function(err) {
            if (err) return handleError(err);
            res.redirect('/noticeList');
        });
    }
}