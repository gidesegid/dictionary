

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
 //  var promise=myservice.getData();
	// promise.then(function(data){
	// 	$scope.myData=data;
	// 	console.log($scope.myData);
	// });

// $scope.refresh=function(){
	$http.get('/data').success(function(response){
  
  	$scope.myData=response;
  });

 $scope.add=function(){
 	
 	$http.get('/dataw/'+$scope.fromSelectedLanguageId+'/'+$scope.inputdata+'/'+$scope.toSelectedLanguageId).success(function(response){
 		console.log(response);
 		$scope.outPut=response;
 	});
 }

 })
