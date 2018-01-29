var express = require('express');
var hbs = require('hbs');
var app = express();
var fs = require('fs');


app.set('view engine','hbs');

console.log(__dirname);

app.use((req,res,next)=>{
    var log = `Request type: ${req.method}, Time: ${new Date().toString()}, URL: ${req.url}`;
    console.log(log);
    fs.appendFile('log.txt',log+'\n',(err)=>{
        if(err)
        console.log('Error occured: ',err);

    });
    next();
})
app.use(
    (req,res,next)=>{
        res.render('maintenance.hbs',{
            date:new Date().getFullYear()
        });
    }
)
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page'
    });

});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'Who did it',
        year:new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Bad request sent to the server'
    });

});

app.listen(3001);
