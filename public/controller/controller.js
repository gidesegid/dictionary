var app = angular.module('app', ['autocomplete']);

//service
app.factory('dataRetriever', function($http,$q, $timeout){
  var dataRetriever = new Object();
 dataRetriever.getdatas = function(fromSelectedLanguageId) {
    var data = $q.defer();
    var datas;
    var dataFromRemote;
    console.log("from factory"+fromSelectedLanguageId);
  $http.get('/auto/'+fromSelectedLanguageId).then(function(response){
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


//controller

app.controller('MyCtrl',['$scope','$http','dataRetriever', function($scope,$http, dataRetriever){
          $scope.myData=[];
          $scope.datas=[];
          $scope.languageFrom=null;
          $scope.languageTo=null;

          $scope.console = console.log;

  $scope.getdatas = function(){
    return $scope.datas;
  }
  $http.get('/data').success(function(response){
   $scope.myData=response;
  });

  $scope.doSomething = function(typedthings){
    $http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
    $scope.outPut=response;
  });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }

  $scope.fromSwitchTranslation=function(fromSelectedLanguageId){
    console.log(fromSelectedLanguageId);
        var dataPromise = dataRetriever.getdatas(fromSelectedLanguageId);
        dataPromise.then(function(data){
        $scope.datas = data;
        
      });
    } 
    $scope.toswitchTranslation=function(){
       $http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
       $scope.outPut=response;
       });
    }
}]);
