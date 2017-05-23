/**
 * Created by a0801 on 2017/5/23.
 */
var path = require('path');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
                .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var names = require('./lib/names');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// app.disable('x-powered-by'); // 設定不顯示 response header 的 x-powered-by


app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    var name = names.getRandomName();
    res.render('about', {name: name});
});
app.get('/headers', function(req, res){
    res.set('Conttent-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ': ' + req.headers[name] + '<br>';
    }
    res.send(s);
});

//下載檔案
app.get('/attachment', function(req, res){
    console.log('file:' + path.join(__dirname, '/public/img/nodejs.png'));
    res.download(path.join(__dirname, '/public/img/nodejs.png'), 'node.png', function(err){
        if (err) {
            console.log('error:' + err.stack);
        } else {
            console.log('success');
        }
    });
});


app.use(function(req, res, next){
    // res.type('text/plain');
    res.status(404);
    res.render('404');
});

app.use(function(error, req, res, next){
    console.log(error.stack);
    // res.type('text/plain');
    res.status(500);
    res.render('505');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});


