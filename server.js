const express = require('express');
const configure = require('./server/configure');
const mongoose = require('mongoose');

app = express();
app = configure(app);
app.set('port', process.env.PORT || 3000);

// 建立数据库连接
mongoose.connect('mongodb://localhost/testflatform');
mongoose.connection.on('open', function() {
    console.log('Mongoose Connected.');
});
app.listen(app.get('port'), function() {
    console.log(`Server is running on http://localhost:${app.get('port')}`);
});