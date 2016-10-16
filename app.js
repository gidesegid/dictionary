var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser=require('body-parser');
app.set('view engine','ejs');
var path=require('path');
var mysql=require('mysql');
require('./router/main')(app);
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+'/public'));
http://localhost:3000/css/style.css

var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'wedisegid',
  database:'dictionary2'
});
connection.connect(function(error){
  if(!!error){
    console.log('Error');
  }else{
    console.log('connected');
  }
})

// app.get('/data',function(req,res){
	
//    connection.query("select * from languages",function(error,row,fields){
//     if(!!error){
//       console.log('error in query')
//     }else{
//        console.log('succesfully connected');
//        console.log(row);
//        res.json(row);
//     }
//    });
 
// });

     

app.get('/data',function(req,res){
  
 connection.query("select * from languages",function(error,row,fields){
    if(!!error){
      console.log('error in query')
    }else{
       console.log('succesfully connected');
       console.log(row);
       res.json(row);
    }
   });

});

app.get('/dataw/:fromLanguageId/:word/:toLnaguageId',function(req,res){

 var fromLanguageId=req.params.fromLanguageId;
 var word=req.params.word;
 var toLnaguageId=req.params.toLnaguageId;
 console.log(fromLanguageId)
 console.log(word);
 
   
   connection.query("SELECT   words.text, words_1.text AS Expr1 FROM "+
    "languages INNER JOIN words ON languages.id = words.languages_id INNER JOIN translation ON words.id"+
    " = translation.from_id INNER JOIN words AS words_1 ON translation.to_id = words_1.id INNER JOIN languages"+
    " AS languages_1 ON words_1.languages_id = languages_1.id WHERE  (words.text = '"+word+"') AND"+
    " (languages.id ="+fromLanguageId+" ) AND (languages_1.id = "+toLnaguageId+")",function(error,row,fields){
    if(!!error){
      console.log('error in query')
    }else{
       console.log('succesfully connected');
       console.log(row);
       res.send(row);
    }
  
});
})
// app.delete('/data/:id',function(req,res){
//   var id=req.params.id;
//   console.log(id);
//   db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
//     res.json(doc);
//   })
// })
// app.get('/data/:id',function(req,res){
//   var id=req.params.id;
//   console.log(id);
//   db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
//     res.json(doc);
//   });
// })
// app.put('/data/:id',function(req,res){
//   var id=req.params.id;
//   console.log(req.body.name);
//   db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
//    update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
//    new:true},function(err,doc){
//     res.json(doc);
   
// })


//connection.query("SELECT        words.text, words_1.text AS Expr1 FROM            languages INNER JOIN words ON languages.id = words.languages_id INNER JOIN translation ON words.id = translation.from_id INNER JOIN words AS words_1 ON translation.to_id = words_1.id INNER JOIN languages AS languages_1 ON words_1.languages_id = languages_1.id WHERE        (words.text = 'ewe') AND (languages.id = 3) AND (languages_1.id = 2)")
// app.get('/data',function(req,res){
	
// var lid1=id;
// var lid2=2;
// var word="ja"
//   connection.query("SELECT        words.text, words_1.text AS Expr1 FROM "+
//     "languages INNER JOIN words ON languages.id = words.languages_id INNER JOIN translation ON words.id"+
//     " = translation.from_id INNER JOIN words AS words_1 ON translation.to_id = words_1.id INNER JOIN languages"+
//     " AS languages_1 ON words_1.languages_id = languages_1.id WHERE  (words.text = '"+word+"') AND"+
//     " (languages.id ="+lid2+" ) AND (languages_1.id = "+id+")",function(error,row,fields){
//     if(!!error){
//       console.log('error in query')
//     }else{
//        console.log('succesfully connected');
//        console.log(row);
//        res.send(row);
//     }
  
// });
// });




app.listen(3000);
console.log("server is running");
