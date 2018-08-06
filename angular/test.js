const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
var cors = require('cors');
var nodePrd = require('node-prd');
var path = require('path');
var fs = require('fs');
// Get our API routes
const api = require('./server/routes/index');

const port = process.env.PORT || '8000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

//app.use(cors({origin: 'http://localhost:4200'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Require our routes into the application.
require('./server/routes')(app);

app.get('*', function (req, res) {
    console.log("enter")
    //PENTAHO REPORT
    var nPrd = nodePrd.createInstance(
        {
            // reportBundlePath: "/home/sesame/IQBAL/project/pentaho/report-templates/pentahod.prpt",
            // outputFilePath: path.resolve("/home/sesame/IQBAL/project/pentaho/out/report"),
            reportBundlePath: "/home/jooshifa/Desktop/COPYtoLINUX/Pentaho/report-templates/test3.prpt",
            outputFilePath: path.resolve("/home/jooshifa/Desktop/COPYtoLINUX/Pentaho/out/report/test4"),
            outputType: "pdf",
            params: [
                { name: "id", value: 2, type: "Integer" },
            ]
        },
        {
            // prdHomePath: '/home/sesame/IQBAL/project/pentaho/prd-ce-5.0.1-stable/report-designer',//process.env.PRD_HOME,
            prdHomePath: '/home/jooshifa/Desktop/COPYtoLINUX/report-designer',
            tmpParentFolder: __dirname
        }
    );
    nPrd.initRaaS(3333, true, true);

    // console.log('node-prd version: ' + nPrd.getVersion());
    console.log('Running report...');
    //END

    //Run report
    nPrd.runReport(function (code) {
        console.log("CODE", code)
        if (code == 0)
            console.log("Report OK");
        else
            console.log("Report ERROR=" + code);
    }, false, true);
    //end
});
 
module.exports = app;
