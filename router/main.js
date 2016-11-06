
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
     app.get('/auto/:languages/:inputdata',function(req,res){
        var id=req.params.languages;
        var inputdata=req.params.inputdata
       // connection.query("select * from words WHERE languages_id=? LIMIT 20",id,function(error,row,fields){
     //connection.query("select word_3.word from word_3 where word_3.word='"+inputdata+"' and word_3.language_id='"+id+"'",function(error,row,fields){
     connection.query("select word_3.word from word_3 where word_3.word like '"+inputdata+"%"+"' and word_3.language_id='"+id+"'",function(error,row,fields){
      
        if(!!error){
            console.log(error);
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.json(row);
        }
      })
     })
    app.get('/languages',function(req,res){
  
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
    //retrieve inputvalue from mysqltable 
    app.get('/word/:fromLanguageId/:suggestion',function(req,res){

             var fromLanguageId=req.params.fromLanguageId;
             var inputdata=req.params.suggestion;
            connection.query("select word_3.wordValueId from word_3 where word_3.word='"+inputdata+"' and word_3.language_id='"+fromLanguageId+"'",function(error,row,fields){
                if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.json(row);
                }
              });
   });

    app.get('/word2/:toswitchTranslationId/:datas',function(req,res){
                 var toswitchTranslationId=req.params.toswitchTranslationId;
                 var wordvalue=req.params.datas;
                
              connection.query("select word_3.word from word_3 where word_3.wordValueId='"+wordvalue+"' and word_3.language_id='"+toswitchTranslationId+"'",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });

    });
}