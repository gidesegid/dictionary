var app = angular.module('app', ['autocomplete']);

//service
app.factory('dataRetriever', function($http,$q, $timeout){

  var dataRetriever = new Object();

 dataRetriever.getdatas = function(languages,inputdata) {
    var data = $q.defer();
    var datas=null;
    var dataFromRemote;
  $http.get('/auto/'+languages+'/'+inputdata).then(function(response){
       dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.word }));
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
          $scope.fromSwitchTranslation=null;
          $scope.toswitchTranslation=null;
  //retrieve languages
      $http.get('/languages').success(function(response){
       $scope.myData=response;
      });
//filling data from data base to autocomplete textfield
  $scope.fillData = function(typedthings,fromSelectedLanguageId,inputdata){
    $scope.fromSelectedLanguageId=fromSelectedLanguageId
    if($scope.languages===7){
           
              $scope.myFunct = function($event){
             
                if ($event.which == 113) {
                    $scope.inputdata +="ቅ";
                }
              };
    }
   if($scope.languages==null){
       document.getElementById("remainderLangSelector").innerHTML="Select language from the above.ኣብ ላዕሊ ካብዘለዉ ቛንቛታት ምረጹ"
       document.getElementById("infoToLang").innerHTML="";
     }else if($scope.inputdata===""){
        document.getElementById("infoToLang").innerHTML="";
     }
     else{
      var dataPromise = dataRetriever.getdatas($scope.languages,$scope.inputdata);
        $scope.datas=null;
        dataPromise.then(function(data){
        $scope.datas = data;
   
       });
     }
   }
//data selection from autocomplete
  $scope.dataSelection = function(suggestion){
    $scope.datas=null;
     $http.get('/word/'+$scope.languages+'/'+suggestion).then(function(response){
       valueFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.wordValueId }));
       $scope.datas=JSON.parse(valueFromRemote);
      $scope.value=response.data[0].wordValueId;
  })
}
  //from languages
  $scope.fromSwitchTranslation=function(fromSelectedLanguageId){
    $scope.languages=fromSelectedLanguageId;
     document.getElementById("remainderLangSelector").innerHTML="";
     document.getElementById("infoToLang").innerHTML="";
  } 
//to languages 
    $scope.toswitchTranslation=function(toswitchTranslationId){
      if($scope.inputdata==null){
        document.getElementById("infoToLang").innerHTML="Please select language from the top and fill word at the input field and then click this button.ካብ ኣብ ላዕሊ ዘለዉ መልጎም ቛንቛ ምረጹ ብድሕሪኡ ኣብ ትሕቲኡ ዘሎ መምልኢ ቦታ ዝደለኹሞ ቃላት ናይቲ ዝመረጽኩሞ ቛንቛ ድሕሪ ምጽሓፍ፣ካብቶም ዝመጽኹም ምርጫታት ውጽኢት ናይቲ ዝጸሓፍኩሞ መረጹ ኣብ መወዳእታ ናብቲ ክትርኮመልኩም ዝደለኹሞ ኣብ ታሕቲ ዘለዉ መልጎም ቛንቛታት ህረሙ።"
      }else{
          $http.get('/word2/'+toswitchTranslationId+'/'+$scope.value).success(function(response){
          $scope.outPut=response;
       });
      }
    }
}]);

//    var array = [2, 5, 9];
// var index = array.indexOf(5);
//  array.splice(index, 1);
   
var buttons = document.getElementsByTagName("button");
var buttonsCount = buttons.length;
 var arr=[];
 var arr2=[1,2,3,4,5,6,7,8,9,10]
for (var i = 0; i <= buttonsCount; i += 1) {

    buttons[i].onclick = function(e) {
        document.getElementById(this.id).style.color='red';
        // arr.shift(this.id);
        // arr.push(this.id);
        var ind=this.id
        console.log("index id "+ind)
       arr2.splice(ind,-1);
       // console.log(arr)
        console.log(arr2)
        arr2 = arr2.filter(function(item) { 
          return item == ind;
         });
        console.log(arr2); 
       // console.log("index id of selected item"+ index);

       // for(var j=0;j!==this.id;j+=1){
       //     document.getElementById(this.id).style.color='black';
       // }
    };
  }

// function toEnglish(){
//   document.getElementById("to1").style.color='red';
//   document.getElementById("to2").style.color='black';
//   document.getElementById("to3").style.color='black';
//   document.getElementById("to4").style.color='black';
//   document.getElementById("to5").style.color='black';
//   document.getElementById("to6").style.color='black';
//   document.getElementById("to7").style.color='black';
//   document.getElementById("to8").style.color='black';
//   document.getElementById("to9").style.color='black';
//   document.getElementById("to10").style.color='black';

// }
