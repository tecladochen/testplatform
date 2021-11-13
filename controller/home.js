const Test = require('../models/test');
const User = require('../models/user');
const Record = require('../models/record');
const Notice = require('../models/notice');

module.exports = {
    // 自定义中间件函数，没有next，因为是最后一个
    index: function(req, res) {
        // 响应返回首页
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'main',
            tests: []
        };
        Test.find({}, 'title text', function(err, tests) {
            if (err) return handleError(err);
            if (tests) {
                tests.forEach(function(elem) {
                    const temp = {};
                    temp.title = elem.title;
                    temp.text = elem.text;
                    this.push(temp);
                }, viewModel.tests);
                res.render('index', viewModel);
            }
        });
    },
    contact: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        res.render('contact', { layout: 'main' });
    },
    setting: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const email = req.session.userEmail;
        const viewModel = {
            layout: 'main',
            user: {}
        };
        User.findOne({ email: email }, function(err, user) {
            if (err) return handleError(err);
            if (user) {
                viewModel.user.email = user.email;
                viewModel.user.password = user.password;
                viewModel.user.text = user.text;
                res.render('setting', viewModel);
            }
        });
    },
    notice: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'main',
            notice: {
                topic: req.query.topic,
            },
        };
        Notice.findOne({ topic: viewModel.notice.topic }, function(err, notice) {
            if (err) return handleError(err);
            if (notice) {
                viewModel.notice.content = notice.content;
                viewModel.notice.email = notice.email;
                res.render('notice', viewModel);
            }
        });
    },
    login: function(req, res) {
        res.render('login', { layout: false });
    },
    register: function(req, res) {
        res.render('register', { layout: false });
    },
    // 后台首页，试题管理
    testManage: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            tests: []
        };
        Test.find({}, 'title text', function(err, tests) {
            if (err) return handleError(err);
            if (tests) {
                tests.forEach(function(elem) {
                    const temp = {};
                    temp.title = elem.title;
                    temp.text = elem.text;
                    this.push(temp);
                }, viewModel.tests);
                res.render('testManage', viewModel);
            }
        });
    },
    testAdd: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        res.render('testAdd', { layout: 'admin' });
    },
    // 用户管理模块
    userManage: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            users: []
        };
        User.find({}, 'email password', function(err, users) {
            if (err) return handleError(err);
            if (users) {
                users.forEach(function(elem) {
                    const temp = {};
                    temp.email = elem.email;
                    temp.password = elem.password;
                    this.push(temp);
                }, viewModel.users);
                res.render('userManage', viewModel);
            }
        });
    },
    noticeSend: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        res.render('noticeSend', { layout: 'admin' });
    },
    userDelete: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const email = req.query.email;
        User.deleteOne({ email: email }, function() {
            res.redirect('/userManage');
        });
    },
    userUpdate: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            user: {}
        };
        User.findOne({ email: req.query.email }, function(err, user) {
            if (err) return handleError(err);
            if (user) {
                viewModel.user.email = user.email;
                viewModel.user.password = user.password;
                viewModel.user.text = user.text;
                res.render('settingAdmin', viewModel);
            }
        });
    },
    test: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'main',
            test: {
                title: req.query.title,
                content: [],
            }
        };
        Test.findOne({ title: viewModel.test.title }, 'content', function(err, test) {
            if (err) return handleError(err);
            if (test) {
                test.content.forEach(function(elem) {
                    const temp = {};
                    temp.question = elem.question;
                    temp.selectA = elem.selectA;
                    temp.selectB = elem.selectB;
                    temp.selectC = elem.selectC;
                    temp.selectD = elem.selectD;
                    this.push(temp);
                }, viewModel.test.content);
                res.render('test', viewModel);
            }
        });
    },
    testShow: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            test: {
                title: req.query.title,
                content: [],
            },
        }
        Test.findOne({ title: viewModel.test.title }, 'content', function(err, test) {
            if (err) return handleError(err);
            if (test) {
                test.content.forEach(function(elem) {
                    const temp = {};
                    temp.question = elem.question;
                    temp.selectA = elem.selectA;
                    temp.selectB = elem.selectB;
                    temp.selectC = elem.selectC;
                    temp.selectD = elem.selectD;
                    temp.answer = elem.answer;
                    temp.analyze = elem.analyze;
                    this.push(temp);
                }, viewModel.test.content);
                res.render('testShow', viewModel);
            }
        });
    },
    testDelete: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const title = req.query.title;
        Test.deleteOne({ title: title }, function() {
            res.redirect('/testManage');
        })
    },
    testAnalyze: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'main',
            test: {
                title: req.query.title,
                content: [],
            },
        }
        Test.findOne({ title: viewModel.test.title }, 'content', function(err, test) {
            if (err) return handleError(err);
            if (test) {
                test.content.forEach(function(elem) {
                    const temp = {};
                    temp.question = elem.question;
                    temp.selectA = elem.selectA;
                    temp.selectB = elem.selectB;
                    temp.selectC = elem.selectC;
                    temp.selectD = elem.selectD;
                    temp.answer = elem.answer;
                    temp.analyze = elem.analyze;
                    this.push(temp);
                }, viewModel.test.content);
                console.log(viewModel.test);
                res.render('testAnalyze', viewModel);
            }
        });
    },
    record: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const email = req.session.userEmail;
        const viewModel = {
            layout: 'main',
            records: []
        };
        Record.find({ email: email }, 'email title score', function(err, records) {
            if (err) return handleError(err);
            if (records) {
                records.forEach(function(elem) {
                    const temp = {
                        email: elem.email,
                        title: elem.title,
                        score: elem.score,
                        date: elem._id.getTimestamp()

                    };
                    this.push(temp);
                }, viewModel.records);
                res.render('record', viewModel);
            }
        });
    },
    recordAdmin: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const email = req.session.userEmail;
        const viewModel = {
            layout: 'admin',
            records: []
        };
        Record.find({}, 'email title score', function(err, records) {
            if (err) return handleError(err);
            if (records) {
                records.forEach(function(elem) {
                    const temp = {
                        email: elem.email,
                        title: elem.title,
                        score: elem.score,
                        date: elem._id.getTimestamp()
                    };
                    this.push(temp);
                }, viewModel.records);
                res.render('recordAdmin', viewModel);
            }
        });
    },
    noticeList: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            notices: []
        };
        Notice.find({}, function(err, notices) {
            if (err) return handleError(err);
            if (notices) {
                notices.forEach(function(elem) {
                    const temp = {};
                    temp.email = elem.email;
                    temp.topic = elem.topic;
                    this.push(temp);
                }, viewModel.notices);
                res.render('noticeList', viewModel);
            }
        });
    },
    noticeShowAdmin: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'admin',
            notice: {
                topic: req.query.topic,
            },
        };
        Notice.findOne({ topic: viewModel.notice.topic }, function(err, notice) {
            if (err) return handleError(err);
            if (notice) {
                viewModel.notice.content = notice.content;
                viewModel.notice.email = notice.email;
                res.render('noticeShowAdmin', viewModel);
            }
        });
    },
    notices: function(req, res) {
        if (!req.session.userEmail) {
            res.render('login', { layout: false })
        }
        const viewModel = {
            layout: 'main',
            notices: []
        };
        Notice.find({ $or: [{ accept: req.session.userEmail }, { accept: '' }] }, function(err, notices) {
            if (err) return handleError(err);
            if (notices) {
                notices.forEach(function(elem) {
                    const temp = {};
                    temp.email = elem.email;
                    temp.topic = elem.topic;
                    this.push(temp);
                }, viewModel.notices);
                res.render('notices', viewModel);
            }
        });
    },
    reply: function(req, res) {
        const email = req.query.email;
        const viewModel = {
            layout: 'admin',
            email: email,
        };
        res.render('noticeSend', viewModel);
    },
    noticeDelete: function(req, res) {
        if (req.session.userEmail != 'tecladochen@gmail.com') {
            res.render('login', { layout: false })
        }
        const topic = req.query.topic;
        Notice.deleteOne({ topic: topic }, function() {
            res.redirect('/noticeList');
        })
    }
};