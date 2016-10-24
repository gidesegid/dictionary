
var express=require('express');
var mysql=require('mysql');
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

module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
     app.get('/contact',function(req,res){
        res.render('contactUs.html');
    });
     app.get('/adminPage',function(req,res){
        res.render('adminPage.html');
    });
      app.get('/contactUs',function(req,res){
        res.render('contactUs.html');
    });
      app.get('/about',function(req,res){
        res.render('about.html');
    });
       app.get('/paragraph',function(req,res){
        res.render('paragraph.html');
    });
       app.get('/p2',function(req,res){
        res.render('index2.html');
    });
     app.get('/auto/:id',function(req,res){
        var id=req.params.id;
        connection.query("select * from words WHERE languages_id=?",id,function(error,row,fields){
        if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.json(row);
        }
      })
     })
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
     
}



   

