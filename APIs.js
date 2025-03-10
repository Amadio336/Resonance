
import {handleGkwValues} from "./main.js"
/* this part aims to provide main.js grammar info about words provided */

const inputGtx = document.getElementById("input-gtx")
const buttonSubmit = document.getElementById("button-submit")

let index = 0;
let cleanedGText = []; // viene creato un array dove ogni elemento di arr1 viene trasformato in un oggetto con il suo indice
let sortedArr = [];
let conflictedWordsArray = []
let jsonFIleArray = []
let indexWordConflicted = []



buttonSubmit.addEventListener("click", searchFlection)


 async function searchFlection() {
  

 let rowGText = inputGtx.value;
let splittedGtext = rowGText.split(" "); // viene trasformato in un array con split, ogni spazio è un elemento



splittedGtext.forEach((gkw) => { // prendere gli elementi di arr1, ci mette un indce e le mette dentro arr2
  const gkwObj = {
    word: gkw,
    id: index,
  };
  
  cleanedGText.push(gkwObj);
  
  index++; // incrementa l'indice

});


cleanedGText.forEach((gkw) => {
 
  fetch(
    `https://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=${gkw.word}`  // viene fatta una richiesta per la flessione di una parola
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonFIle = JSON.parse(data);



   


  /* variabile che contiene la lunghezza della chiave Body  */
   let objLenght = jsonFIle.RDF.Annotation.Body.length


   /* cioè se il body non ha più array, quindi è un parola non omonima  */
   if (objLenght === undefined) {
   

    /* se la parola non omonima è un nome */
    if (jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "noun") {
  
      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        gend:  jsonFIle.RDF.Annotation.Body.rest.entry.dict.gend.$,
        decl: jsonFIle.RDF.Annotation.Body.rest.entry.dict.decl.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);
    } else if (jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "verb"){  /* altrimenti, se la parola non omonima è un verbo */

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        tense : undefined, 
        mood: undefined,
        id: gkw.id,
      };


      /* these two lines manage the problem infl has more than only one object. If infl has only one object, it takes normally the value of verb.tense and verb.mood, otherwise it takes the first result */
      jsonFIle.RDF.Annotation.Body.rest.entry.infl.length == undefined ? notSortedObj.tense = jsonFIle.RDF.Annotation.Body.rest.entry.infl.tense.$ : notSortedObj.tense = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].tense.$
      jsonFIle.RDF.Annotation.Body.rest.entry.infl.length == undefined ? notSortedObj.mood = jsonFIle.RDF.Annotation.Body.rest.entry.infl.mood.$ : notSortedObj.tense = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].mood.$
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);


    } else if (jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "pronoun"){ /* se la parola non ominima è un pronome */

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);

    } else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "particle"){  // particella

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);



    }  else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "preposition"){ // preposizioni
      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);




    }   else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "adjective"){

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        decl: jsonFIle.RDF.Annotation.Body.rest.entry.dict.decl.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);





    } else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "article"){

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);


    } else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "conjunction"){

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);


    } else if(jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "adverb"){

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
   
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);
    }


 
    
    else { /* , serve a dire tutto quello che non è nome né verbo né altro sopra non lo contare, lo hai inserito solo per mantenere bene l'ordine di Sorted Array */

      const notSortedObj = {
        id: gkw.id,
      };

      sortedArr.push(notSortedObj)
      sortedArr.sort((a, b) => a.id - b.id);


    }
      
    } else if(objLenght > 1){ /* se il body ha più oggetti, quindi è una parola omonima, prende arbitrariamente la prima occorrenza */

      jsonFIleArray.push(jsonFIle)

      const notSortedObj = {
        id: gkw.id,
      };
      
      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id); 

      indexWordConflicted.push(gkw.id)

      
      /* this part of code hilights with red conflicted words */
      const wordsHiligtable = document.querySelectorAll(".highlightable")
      const conflictedWord = Array.from(wordsHiligtable)[notSortedObj.id]
      conflictedWordsArray.push(conflictedWord)
      conflictedWord.classList.add("conflicted")
   }
    })
     .catch((error) => {
     
      console.error("Errore nel recupero dati:", error)

      const notSortedObj = {
        id: gkw.id,
      };

      sortedArr.push(notSortedObj)
      sortedArr.sort((a, b) => a.id - b.id);



    });    
  });
  
 
    console.log("sorted Arr", sortedArr)  
  
}


let arrProva = []


const resolveConflictButton = document.getElementById("resolve-conflict")

/* button to resolve conflict */



resolveConflictButton.addEventListener("click", handleConflict)

function handleConflict() {
  
  
  const words = document.querySelectorAll(".conflicted")


  const highlightableGreekWords = document.querySelectorAll(".highlightable")

  let index = 0

  highlightableGreekWords.forEach(word =>{
    word.setAttribute("data-index-word", index)
    index++
  })


 console.log(jsonFIleArray)

 let dataIndex = 0
 jsonFIleArray.forEach(element =>{



const conflictInterface = document.createElement("div")
 conflictInterface.classList.add("conflict-interface")
 conflictInterface.setAttribute("data-index", dataIndex)
 document.getElementById("wrapper-greek-text").appendChild(conflictInterface)
 


 dataIndex++
 let dataIndexValue = 0;

 let bodyLenght = element.RDF.Annotation.Body.length


 for (let index = 0; index < bodyLenght; index++) {
  
   const option = document.createElement("div")
   option.innerHTML = `<div class="option">${index} </br> ${element.RDF.Annotation.Body[index].rest.entry.dict.hdwd.$} </br> ${element.RDF.Annotation.Body[index].rest.entry.dict.pofs.$}
   </div>`
   conflictInterface.appendChild(option)

   conflictInterface.addEventListener("click", ()=>{
    dataIndexValue = conflictInterface.getAttribute("data-index")
    console.log(dataIndexValue)
   })


   let indexFinal =0

   option.addEventListener("click",(e) =>{

     const optionIndex = e.target.textContent[0]
    const resolvedWord = jsonFIleArray[dataIndexValue].RDF.Annotation.Body[optionIndex]

    console.log(resolvedWord)

    console.log(indexWordConflicted)

    sortedArr[indexWordConflicted[indexFinal]].subvoce = "ciao"
    indexFinal++


     

      
  

    console.log(sortedArr)



 


    
    
   



    
   })

  
 } /*  */

 
 
})}








 




export { sortedArr }


