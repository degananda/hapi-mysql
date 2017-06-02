// RESTful API Hapi + Mysql
// memanggil instances hapi
var hapi = require('hapi');
var mysql = require('mysql');

// membuat server dan konfigurasi http
var hapiServer = new hapi.Server();
hapiServer.connection({
    host : 'localhost',
    port : 7728 
});

// mysql settings
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_scriptsi'
});
 
connection.connect(function(err){
if(err){
    console.log('something wrong with mysql database connection');
    connection.end();
}
});

// route list
var noteRouter = require('./routerModule/note.js')(hapiServer,connection);

// menjalankan hapi
hapiServer.start(
    function(err){
        console.log("hapi berjalan pada port" +  hapiServer.info.port)
    }
);