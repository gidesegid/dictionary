
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
       app.get('/login',function(req,res){
        res.render('login.html');
    });
       app.get('/paragraph',function(req,res){
        res.render('paragraph.html');
    });
       app.get('/p2',function(req,res){
        res.render('index2.html');
    });
       //autocomplete data
     app.get('/auto/:languages/:inputdata',function(req,res){
        var id=req.params.languages;
        var inputdata=req.params.inputdata
        connection.query("select collectedwords.word from collectedwords where collectedwords.word like '"+inputdata+"%"+"' and collectedwords.language_id='"+id+"' LIMIT 10",function(error,row,fields){
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
     //languages data
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
            connection.query("select collectedwords.wordValueId from collectedwords where collectedwords.word='"+inputdata+"' and collectedwords.language_id='"+fromLanguageId+"'",function(error,row,fields){
                if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.json(row);
                }
              });
   });
//output of the translation
    app.get('/word2/:toswitchTranslationId/:datas',function(req,res){
                 var toswitchTranslationId=req.params.toswitchTranslationId;
                 var wordvalue=req.params.datas;
                
              connection.query("select collectedwords.word from collectedwords where collectedwords.wordValueId='"+wordvalue+"' and collectedwords.language_id='"+toswitchTranslationId+"'",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    });
    //retrieve all new words to browther from database
    app.get('/newWords',function(req,res){
               
              connection.query("select * from newwords",function(error,row,fields){
               if(!!error){
                  console.log('error in query from database maybee')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    });
    //add new word to database
    app.post("/addNewWord/:eng/:tig/:id",function(req,res){
               var eng=req.params.eng;
               var tig=req.params.tig;
               var id=req.params.id;
               console.log(eng)
               console.log(tig)
               console.log(id)
              connection.query("insert into newWords(english,tigrigna,userId) values('"+eng+"'"+","+"'"+tig+"'"+","+"'"+id+"')",function(error,row,fields){
               if(!!error){
                  console.log('error in query ፍሮም ዳታባኤዝ')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
             });
    });
    //authentication
    app.get('/login/:userName/:password',function(req,res){
        var userName=req.params.userName;
        var password=req.params.password;

            connection.query("select userName,password,id from users where userName=?",userName,function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    })
    //retrievd data to updates from table test1
     app.get('/updates',function(req,res){
       
            connection.query("SELECT * from test1 where wordTig='"+"' LIMIT 20",function(error,row,fields){
               if(!!error){
                  console.log('error in query')
                }else{
                   console.log('succesfully connected');
                   console.log(row);
                   res.send(row);
                }
          
             });
    })
//update test1 tables
    app.put('/updateword/:langid/:value/:word/:userId',function(req,res){
      var id=req.params.langid;
      var value=req.params.value;
      var word=req.params.word;
      var userId=req.params.userId
     //update to test1 
     connection.query("UPDATE test1 SET wordTig='"+word+"'"+",userId="+userId+"  WHERE value='"+value+"'",function(error,row,fields){
       if(!!error){
          console.log('error in query')
        }else{
           console.log('succesfully connected');
           console.log(row);
           res.send(row);
        }
  
     });

    })
//update data in the collectedwords
     app.put('/updatewordInColl/:langid/:value/:word',function(req,res){
      var id=req.params.langid;
      var value=req.params.value;
      var word=req.params.word;
      connection.query("UPDATE collectedwords SET word='"+word+"' WHERE wordValueId='"+value+"'"+"AND language_id=7",function(error,row,fields){
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