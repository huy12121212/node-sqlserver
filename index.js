var express = require("express");
const sql = require('mssql')

var app = express();

app.set('view engine', 'ejs');


// Enable tcp protocol for sql server, set the sttaic port to 1433 for all ips, restart the server

//const DbConnectionString = 'mssql://{user-name}:{password}@{db-server-ip}:{sql-server-port}/{db-name}';
const DbConnectionString = 'mssql://sa:sa@169.254.123.91/Book';

sql.on('error', err => {
    console.dir(err);
    sql.close();
});
var year = '2003';
var y2 = '2001';

var pu = "\'Pat%\'";


app.get("/", function(req, res) {
    sql.connect(DbConnectionString).then(pool => {
        return pool.request()
            
            //.query(`select * from Books where Year = ${y2} or Year = ${year} order by Year`);
            //.query(`select * from Books where Year = ${y2} or Year = ${year} order by Year`);
           .query(`select * from Books where Publisher like ${pu}`);
           console.log(pu);
            
    }).then(result => {
        sql.close();
        res.render("data", { model: result.recordset });
    }).catch(err => {
        console.dir(err);
        sql.close();
    });
});

var port = '4150'
app.listen(port, function() {
    console.log("node server listening at port : " + port);
});