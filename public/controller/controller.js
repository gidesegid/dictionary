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
          $scope.fromSwitchTranslation=null;
          $scope.toswitchTranslation=null;


          // $scope.console = console.log;

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

  $scope.isActive = false;
  $scope.fromSwitchTranslation=function(fromSelectedLanguageId){
    console.log(fromSelectedLanguageId);
 
    $scope.fromSelectedLanguageId=fromSelectedLanguageId;
    console.log("from scope"+$scope.fromSelectedLanguageId)
        var dataPromise = dataRetriever.getdatas(fromSelectedLanguageId);
        dataPromise.then(function(data){
        $scope.datas = data;
        
      });
      if(fromSelectedLanguageId){

      }
  } 

  // $scope.fromSwitchTranslation=function(fromSelectedLanguageId){
  //   console.log(fromSelectedLanguageId);
  //       var dataPromise = dataRetriever.getdatas(fromSelectedLanguageId);
  //       dataPromise.then(function(data){
  //       $scope.datas = data;
        
  //     });
  //        if(fromSelectedLanguageId){

  //     }
  //   } 
     $scope.toswitchTranslation=function(toswitchTranslation){
      console.log("from language"+ $scope.fromSelectedLanguageId)
      console.log("to language id"+toswitchTranslation)
       $http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+toswitchTranslation).success(function(response){
       $scope.outPut=response;
       });
    }
}]);

function toEnglish(){
  console.log("english is clicked");
  document.getElementById("to1").style.color='blue';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='black';
  // document.getElementById("to4").style.color='black';
  // document.getElementById("to5").style.color='black';
  // document.getElementById("to6").style.color='black';
  // document.getElementById("to7").style.color='black';
  // document.getElementById("to8").style.color='black';

}
function toDutch(){
  console.log("dutch is clicked");
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='blue';
  document.getElementById("to3").style.color='black';
  // document.getElementById("to4").style.color='black';
  // document.getElementById("to5").style.color='black';
  // document.getElementById("to6").style.color='black';
  // document.getElementById("to7").style.color='black';
  // document.getElementById("to8").style.color='black';

}
function toTigrigna(){
  console.log("tigrigna is clicked");
  document.getElementById("to1").style.color='black';
  document.getElementById("to2").style.color='black';
  document.getElementById("to3").style.color='blue';
  // document.getElementById("to4").style.color='black';
  // document.getElementById("to5").style.color='black';
  // document.getElementById("to6").style.color='black';
  // document.getElementById("to7").style.color='red';
  // document.getElementById("to8").style.color='black';

}

function english(){
  console.log("english is clicked");
  document.getElementById("1").style.color='blue';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='black';
  // document.getElementById("4").style.color='black';
  // document.getElementById("5").style.color='black';
  // document.getElementById("6").style.color='black';
  // document.getElementById("7").style.color='black';
  // document.getElementById("8").style.color='black';

}
function dutch(){
  console.log("dutch is clicked");
   document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='blue';
  document.getElementById("3").style.color='black';
  // document.getElementById("4").style.color='black';
  // document.getElementById("5").style.color='black';
  // document.getElementById("6").style.color='black';
  // document.getElementById("7").style.color='black';
  //  document.getElementById("8").style.color='black';
}
function tigrigna(){
  console.log("tigrigna is clicked");
   document.getElementById("1").style.color='black';
  document.getElementById("2").style.color='black';
  document.getElementById("3").style.color='blue';
  // document.getElementById("4").style.color='black';
  // document.getElementById("5").style.color='black';
  // document.getElementById("6").style.color='black';
  // document.getElementById("7").style.color='red';
  // document.getElementById("8").style.color='black';
}