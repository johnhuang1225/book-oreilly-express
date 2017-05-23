/**
 * Created by a0801 on 2017/5/23.
 */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
                .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var names = require('./lib/names');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    var name = names.getRandomName();
    res.render('about', {name: name});
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


