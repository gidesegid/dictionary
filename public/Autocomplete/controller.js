var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('dataRetriever', function($http, $q, $timeout){
  var dataRetriever = new Object();

  dataRetriever.getdata = function(i) {
    var data = $q.defer();
    var words;
    var json_data = {"2013-01-21":1,"2013-01-22":7};
http.get('/auto').success(function(response){
  var dataFromDatabase=response
})
    var moreWords=[];
    moreWords.push(dataFromDatabase);
    //var moreWords = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]

    if(i && i.indexOf('T')!=-1)
      words=moreWords;
    else
      words=moreWords;

    $timeout(function(){
      data.resolve(words);
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