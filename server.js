const express = require("express")
const app = express();
const port = 3002;
const http = require("http");
const socketIo = require("socket.io");
const server = http.Server(app);
const io = socketIo(server);
const path = require("path");
const admin = require("./routes/admin")(io);
const company = require("./routes/company")(io);
const user = require("./routes/user")(io);
// const company = require("./routes/company")(io);
const bodyParser = require("body-parser");
const passport = require('passport');
var session = require('express-session');
const cors = require('cors');
const config = require("./config/config");
var nodePrd = require('node-prd');
var fs = require('fs');

var nodeLoader = require("node-loader")

// ---------------------------------------------pre-loader------------------------------------------------------

// var preloader = require('preloader');
// var loader = preloader({
//   xhrImages: false
// });
// loader.on('progress',function(progress) {
//   console.log(progress);
// });
// loader.on('complete',function() {
//   var data = loader.get('site_data.json');
//   console.log('all content loaded!');
// });
// loader.add('http://localhost:3000');
// loader.add('http://localhost:3000',{
//   onComplete: function(content) {
//     document.body.appendChild(loader.get('test_image.jpg'));
//   }
// });
// loader.add('site_data.json');
// loader.load();

// --------------------------------------------pre-loader---------------------------------------------------------------


app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({limit:'50mb'}));


//app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: true } }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, "public")));
app.use('/company', company);
app.use('/admin', admin);
app.use('/user', user);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    function (req, res) {
        return res.redirect("/compay-aditninfo/" + req.user.id);
    });
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'),
    function (req, res) {
        // console.log(req);
        return res.redirect("/compay-aditninfo/" + req.user.id);
    });

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/', (req, res) => {
    res.send("Invalid end point");
});

server.listen(port,() => {
    console.log("Server Started On Port " + port);

});

//===========================================pentaho report==================================================================

    //PENTAHO REPORT
    /* var nPrd = nodePrd.createInstance(
        {
            reportBundlePath: "/home/jooshifa/Desktop/COPYtoLINUX/taskit/report-templates/test3.prpt",
            outputFilePath: path.resolve("/home/jooshifa/Desktop/COPYtoLINUX/taskit/out/report/myreport9"),
            outputType: "pdf",
            //outputType: "excelXlsx",
            params: [
                { name: "id", value: 3, type: "Integer" },
            ]
        },
        {
            prdHomePath: '/home/jooshifa/Desktop/COPYtoLINUX/report-designer',
            tmpParentFolder: __dirname
        }
    );
    nPrd.initRaaS(3333, true, true);
    console.log('Running report...');
    //END

    //Run report
    nPrd.runReport(function (code) {
        console.log("CODE", code)
        if (code == 0)
            console.log("Report OK");
        else
            console.log("Report ERROR=" + code);
    }, false, true); */

//===========================================pentaho app.js==================================================================

