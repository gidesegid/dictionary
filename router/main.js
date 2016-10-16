


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
        console.log("arrived in router");
        res.render('adminPage.html');
    });
     
     
}



    //other routes..

// Some more get requests for different pages


    //url https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4

// router.get('/', function(req, res) {
//     res.send('im the home page!');  
// }); 
// router.get('/about', function(req, res) {
//     res.send('im the about page!'); 
// });
//     router.get('/hello/:name', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
// // apply the routes to our application

// // route middleware to validate :name
// router.param('name', function(req, res, next, name) {
//     // do validation on name here
//     // blah blah validation
//     // log something so we know its working
//     console.log('doing name validations on ' + name);

//     // once validation is done save the new item in the req
//     req.name = name;
//     // go to the next thing
//     next(); 
// });

// router.get('/hello/:name', function(req, res) {
//     res.send('hello ' + req.name + '!');
// });
// app.use('/', router);

// // show the form (GET http://localhost:8080/login)
//     app.get(function(req, res) {
//         res.send('this is the login form');
//     })

//     // process the form (POST http://localhost:8080/login)
//     app.post(function(req, res) {
//         console.log('processing');
//         res.send('processing the login form!');
//     });



