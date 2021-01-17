const multer=require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/')
  },
  filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now() + '')
  }
});

var upload = multer({ storage: storage });
const mysql=require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const app     = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/dosyalarım"));
app.use(bodyParser.json());

var connection = mysql.createConnection({
multipleStatements : true,
host     : 'localhost',
user     : 'root',
password : '12344321',
databese : 'bilgiler'
});

connection.connect(function(err){
  if(err) throw err;
  console.log("MYSQL 'e baglandı..");
});

app.post("/ekle" ,   function(req, res){


  var yapilacaklar=req.body.yapilacaklar;
  console.log(req.body.yapilacaklar);

 var sql=`INSERT INTO liste (yapilacaklar) VALUES('${yapilacaklar}')`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    res.redirect("/");
  });
});

app.get("/" , function(req,res){
  connection.query("SELECT * from bilgiler.liste", function (err, results, fields) {
  if (err) throw err;
  console.log(results);
var veriTabaniListe= results;
  res.render("anasayfa" ,{listem :veriTabaniListe} );
  });

});

























let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port : " + port);
});
