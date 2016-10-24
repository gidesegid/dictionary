var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
//module.value('myprovider',"provider value");
app.factory('dataRetriever', function($http,$q, $timeout){
  var dataRetriever = new Object();


 dataRetriever.getdatas = function(toSelectedLanguageId) {
    var data = $q.defer();
    var datas;
    var dataFromRemote;
    //var x=toSelectedLanguageId;

    console.log("from factory"+toSelectedLanguageId);
  $http.get('/auto/'+toSelectedLanguageId).then(function(response){
       
       dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.text }));
       var datas=JSON.parse(dataFromRemote); 

    $timeout(function(){
      data.resolve(datas);
    },1000);
  })
    return data.promise
}
  return dataRetriever;
});

app.controller('MyCtrl',['$scope','$http','dataRetriever', function($scope,$http, dataRetriever){
$scope.toSelectedLanguageId=2;
$scope.fromSelectedLanguageId=2;
$scope.myData=[];
$scope.datas=[];

 var dataPromise = dataRetriever.getdatas($scope.fromSelectedLanguageId);
 dataPromise.then(function(data){
   $scope.datas = data;
 });
  //console.log('myprovider'+myprovider);

  $scope.getdatas = function(){
    return $scope.datas;
  }
 $http.get('/data').success(function(response){
   $scope.myData=response;
    //console.log("this is from mydata"+response.data)
  });
  $scope.doSomething = function(typedthings){
  
    $http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
   // console.log(response);
    $scope.outPut=response;
  });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }
// function getLanguageId($scope,dataRetriever){
    $scope.toswitchTranslation=function(toSelectedLanguageId){
    dataRetriever.getdatas($scope.toSelectedLanguageId);
     console.log("this is from ctlr"+$scope.toSelectedLanguageId)

  } 
//}
  
}]);
// app.controller('mycontroller',function($scope,$http){
 
//   $http.get('/data').success(function(response){
  
//     $scope.myData=response;
//   });
// $scope.toswitchTranslation=function(){

//   $http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
//     console.log(response);
//     $scope.outPut=response;
//   });

//    }
//  })