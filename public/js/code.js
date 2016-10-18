
function switchTranslation(){
        /*select language from combobox.index 0 indicates the first order from the list which is english to tigrigna
        you can switch also to the second list order of the combobox content index 1 Tigrigna to enlglish.
        when selection selected all the page content  will be converted to the selected language.*/
  var selIdx = document.getElementById("comboboxId1").selectedIndex;

  
 switch(selIdx){
        case 0:
        //the english-Tigrigna language selection
         document.getElementById("pIdTitle").innerHTML="<b>"+"The language you need to translate from "+"</b>";
         document.getElementById("pIdInput").innerHTML="Type the word below please";
         document.getElementById("pIdResult").innerHTML="Here below is the translated word";
         document.getElementById("btnId1").innerHTML="Translate";
         document.getElementById("txtInputId").value="";
         document.getElementById("txtResultId").value="";
        break;
        case 1:
        //the Tigrigna-English language selection
        document.getElementById("pIdTitle").innerHTML="ክትቅይርዎ ደሊኹም ዘለኹም ቓንቓ ";
        document.getElementById("pIdInput").innerHTML="ክትርጎሞልኩም ዝደለኹሞ ቃል ኣብዚ የእትዉ።";
        document.getElementById("pIdResult").innerHTML="ትርጉም ናይ ዘእተኹሞ ቃል እንሆ።";
        document.getElementById("btnId1").innerHTML="ተርጉም";
         document.getElementById("txtInputId").value="";
         document.getElementById("txtResultId").value="";
        break;
 }
 
}
function switchTranslation2(){
  var selIdLanguageParagraph = document.getElementById("languageInputId").selectedIndex;
 switch(selIdLanguageParagraph){
  case 0:
         document.getElementById("pLanId").innerHTML="Write a sentence here.";
         document.getElementById("pLanResultId").value="Translated sentence";
         break;
   case 1:
         document.getElementById("pLanId").innerHTML="Schrijf een zin hete.";
         document.getElementById("pLanResultId").value="Vertaalde zin"
         break;
   case 2:
         document.getElementById("pLanId").innerHTML="ሙሉእ ሓሳባት ኣብዚ ጸሓፉ ?";
         document.getElementById("pLanResultId").value="ትርጉም ናይ ሙሉእ ሓሳብት እንሆ።";
         break;
 }

}
function switchTranslation3(){
  var selIdLanguageParagraphOutput = document.getElementById("languageOutputId").selectedIndex;

 switch(selIdLanguageParagraphOutput){
  case 0:
         document.getElementById("pLanResultId").value="Translated sentence";
         break;
   case 1:
         document.getElementById("pLanResultId").value="Vertaalde zin"
         break;
   case 2:
         
         document.getElementById("pLanResultId").value="ትርጉም ናይ ሙሉእ ሓሳብት እንሆ።";
         break;
 }

}

function comboboxSelectChange(){
 //user input value must be from the list of the textbox content
 document.getElementById("txtResultId").value = document.getElementById("list1").value;
}

function txtOnFocus(){
        /* when the user focuses on the text input the list of words will be populated on the text input so you can be 
        able to select from the list and will be automatically alphebatically ordered as you type the word.*/
        var selIdx = document.getElementById("comboboxId1").selectedIndex;
        switch(selIdx){
                case 0:
                 var output5="";
                for(var key in obj){
                output5 +="<option value="+key+">";
                 }
                
                 document.getElementById("list1").innerHTML=output5;
                 break;
                 case 1:
                  var output5="";
                  //loop through the objects of the language word list
                  for(var key in obj){
                  output5 +="<option value="+obj[key]+">";
                  }
                  
                 document.getElementById("list1").innerHTML=output5;
                 break;

        }
      
   }    

  function btnTranslate(){
 //when button translate clicked the input word will be translated to the selected language
 //according to the combobox selection which is the index of the selected language an output
 //will come on the result box .
 var txtvalue=document.getElementById("txtInputId").value;
 var selIdx = document.getElementById("comboboxId1").selectedIndex;
 
 switch(selIdx){
        case 0:
        //when English-Tigringa language is selected and a word is being written on the text input
        //the crosponding value of that input is being vissible on the text output.
         var output=obj[txtvalue];
         document.getElementById("txtResultId").value=output;
         break;
        case 1:
        //iterate through list of the objects of Tigrigna words at the dictionary.
        for(var key in obj){
                //if the crosponding value of the tigrigna word is found on the list then skip out the itration.otherwise continoue
                //finding it through the whole words.
                if (!obj.hasOwnProperty(key)) {
                continue;
                    }
               //if the crosponding word is found then display it on the text output.
               if (txtvalue==obj[key]){
                   document.getElementById("txtResultId").value=key;
                   break;
               }
        }
       
 }

}