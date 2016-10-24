

var myApp=angular.module('myApp',[]);


//SERVICE
myApp.service('myservice',function($http,$q){
	var deferred=$q.defer();
   
	$http.get('/data').then(function(data){
		deferred.resolve(data);
	})
	this.getData=function(){
		
		return deferred.promise;
	}
	
})



//CONTROLLER
myApp.controller('mycontroller',function($scope,$http){
 
	$http.get('/data').success(function(response){
  
  	$scope.myData=response;
  });
$scope.toswitchTranslation=function(){

	$http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
 		console.log(response);
 		$scope.outPut=response;
 	});

   }
 })

// the service that retrieves some movie title from an url
myApp.factory('dataRetriever', function($http, $q, $timeout){
  var dataRetriever = new Object();

 dataRetriever.getdatas = function(i) {
    var data = $q.defer();
    var datas;
    var dataFromRemote;
  $http.get('/auto').then(function(response){
       
       dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.languages }));
       // dataFromRemote=JSON.parse(response.data.languages)

        console.log(dataFromRemote)
       var moredatas=JSON.parse(dataFromRemote);     
       console.log(moredatas)
       if(i && i.indexOf('T')!=-1)
         datas=moredatas;
       else
          datas=moredatas;

    $timeout(function(){
      data.resolve(datas);
    },1000);
  })
    return data.promise
}
  return dataRetriever;
});

myApp.controller('MyCtrl', function($scope, dataRetriever){
  $scope.datas = dataRetriever.getdatas("...");
  $scope.datas.then(function(data){
    $scope.datas = data;
  });

  $scope.getdatas = function(){
    return $scope.datas;
  }

  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newdatas = dataRetriever.getdatas(typedthings);
    $scope.newdatas.then(function(data){
      $scope.datas = data;
    });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }

});