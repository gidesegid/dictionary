var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('dataRetriever', function($http, $q, $timeout){
  var dataRetriever = new Object();

  dataRetriever.getdata = function(i) {
    var data = $q.defer();
    var words;
    var json_data = {"2013-01-21":1,"2013-01-22":7};
    var languages = [];

    http.get('/auto').success(function(response){
      languages=response
    });

    $timeout(function(){
      data.resolve(languages);
    },1000);

    return data.promise
  }

  return dataRetriever;
});

app.controller('MyCtrl', function($scope, dataRetriever){

  $scope.words = dataRetriever.getdata("...");
  $scope.words.then(function(data){
    $scope.words = data;
  });

  $scope.getdata = function(){
    return $scope.words;
  }

  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newWords = dataRetriever.getmovies(typedthings);
    $scope.newWords.then(function(data){
      $scope.words = data;
    });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }

});
