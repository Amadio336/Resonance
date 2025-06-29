
import {handleGkwValues} from "./main.js"
/* this part aims to provide main.js grammar info about words provided */


import { generateColours } from "./colour-generator.js";

const inputGtx = document.getElementById("input-gtx")
const buttonSubmit = document.getElementById("button-submit")

let index = 0;
let cleanedGText = []; // viene creato un array dove ogni elemento di arr1 viene trasformato in un oggetto con il suo indice
let sortedArr = [];
let conflictedWordsArray = []
let jsonFIleArray = []
let indexWordConflicted = []
let jsonFIleArraySorted = []
let finalArray =[]
let lastIndex = 0



buttonSubmit.addEventListener("click", searchFlection)


 async function searchFlection() {
  

 
 let rowGText = inputGtx.value;
let splittedGtext = rowGText.split(" "); // viene trasformato in un array con split, ogni spazio è un elemento





splittedGtext.forEach((gkw) => { // prendere gli elementi di arr1, ci mette un indce e le mette dentro arr2
  const gkwObj = {
    word: gkw.replace("\n", ""),
    id: index,
  };
  
  cleanedGText.push(gkwObj);
  
  index++; // incrementa l'indice

});

let allJsonFiles = []
let indexJsonReturned =0
 

console.log("cleanedGText", cleanedGText)

cleanedGText.forEach((gkw) => {
 
  fetch(
    `https://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=${gkw.word}`  // viene fatta una richiesta per la flessione di una parola
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonFIle = JSON.parse(data);

      console.log(jsonFIle)


   


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
      
    } else if(objLenght > 1){ 

      jsonFIleArray.push(jsonFIle)

      const notSortedObj = {
        word: gkw.word,
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


let indexFinal = 0
let words = []
let wordsWithUrns = []




/* button to resolve conflict */

const resolveConflictButton = document.getElementById("resolve-conflict")

/* event listner on resolveConflictButton */
resolveConflictButton.addEventListener("click", ()=>{
  

  /* taking all elements conflicted */
  words = document.querySelectorAll(".conflicted")  
  console.log("words",words)
  
  
  let index = 0
  
  words.forEach(word =>{
    word.setAttribute("data-index-word", index)
    index++
    
    let wordWithUrns =  `urn:word:${word.textContent}`
    wordsWithUrns.push(wordWithUrns)
  })
  
  /* sorting data provided by APIs according to the order of the words conlicted in the text */
  jsonFIleArraySorted = wordsWithUrns.map(item => jsonFIleArray.find(x => x.RDF.Annotation.hasTarget.Description.about.normalize("NFC") === item.normalize("NFC")))
  console.log(wordsWithUrns)
  console.log("jsonFIleArraySorted",jsonFIleArraySorted)

  let indexJsonFIle = 0

  for (let element of jsonFIleArraySorted){

    const obj = {
      el: element,
      elId: indexJsonFIle
    }

    indexJsonFIle++
    finalArray.push(obj)
}
  
console.log("finalArray",finalArray)
  
/* contextmenu (tasto destro) function, it's used in order to increment indexFinal by 1 every time I click with rigth click over a word not caugth */
words.forEach(word => {
const handler = function handlerWrapper(event){
  createSkipIterface(word, event)
  word.removeEventListener("contextmenu", handler)
}
  word.addEventListener("contextmenu", handler);
})

/* la logica è: per ogni word (cioè word conflicted) crea l'eventlistner contexmenu ed esegui la funzione handler. Handler però è un insieme di 2 funzioni
quindi eseguirà skip e poi rimuovere l'el */


/* function to remove EL from not found words */
function createSkipIterface(word, event) {
    event.preventDefault(); // Blocca il menu contestuale del browser
    const divSkip = document.createElement("div")
    divSkip.textContent = "Salta"
    divSkip.classList.add("skip-button")
    word.appendChild(divSkip)
    divSkip.addEventListener("click", skipWord)

  }

function skipWord() {
  indexFinal++
  words[lastIndex].classList.remove("conflicted") 
  lastIndex++

  const skipButton = document.querySelector(".skip-button")
  skipButton.remove()
}


    
  
  words.forEach(word => {
    const handler = function handleClickWrapper(event) {
      handleClick(word, event);    
      word.removeEventListener("click", handleClickWrapper); 
    };
    
    word.addEventListener("click", handler);
  });
  
  
  
})



/* algorithm to resolve conflict */
function handleClick(word) {
  
  /* create pink interface */
  const conflictInterface = document.createElement("div")
  conflictInterface.classList.add("conflict-interface")
  /* button to close conflict interface */
  const buttonCloseConflictInterface = document.createElement("div")
  buttonCloseConflictInterface.classList.add("button-close-conflict-interface")
  buttonCloseConflictInterface.innerHTML =  `<i class="bi bi-x-square"></i> ` 
  conflictInterface.appendChild(buttonCloseConflictInterface)
  document.getElementById("wrapper-greek-text").appendChild(conflictInterface)
  
  
  /* close conflictInterface */

  buttonCloseConflictInterface.addEventListener("click", ()=> conflictInterface.remove())

  try{

  for (let element of finalArray)  {

    if (element.el == undefined || element.el == "not found") {
      console.error("non riconosciuto", finalArray.indexOf(element))
      continue
    }


    const URNCleaned = element.el.RDF.Annotation.hasTarget.Description.about.replace("urn:word:", "")

    
    

    if (URNCleaned.normalize("NFC") == word.textContent.normalize("NFC") && element.elId == word.getAttribute("data-index-word")) {
      
      const bodyLength = element.el.RDF.Annotation.Body.length
      
      for (let index = 0; index < bodyLength; index++) {
        const option = document.createElement("div")
        option.classList.add("option")
        option.innerHTML = `<p>${index} </br>${element.el.RDF.Annotation.Body[index].rest.entry.dict.hdwd.$} </br> ${element.el.RDF.Annotation.Body[index].rest.entry.dict.pofs.$} </p>`
        conflictInterface.appendChild(option)
      }}
    };

    }catch(error){console.log(error)}
  
  
  
  
  
  
  const options = document.querySelectorAll(".option")
  
  options.forEach((option, indice) =>{
    option.addEventListener("click", ()=>{
      
      indexWordConflicted.sort((a,b) => a -b)
      
      console.log(indexWordConflicted)
      
      try{
      finalArray.forEach(element =>{

        let URNCleaned;
        
        if (element.el == undefined) {
          return
        }else{
          URNCleaned = element.el.RDF.Annotation.hasTarget.Description.about.replace("urn:word:", "")
        }
      
        
        if (URNCleaned.normalize("NFC") == word.textContent.normalize("NFC")  && element.elId == word.getAttribute("data-index-word")) {
          sortedArr[indexWordConflicted[indexFinal]].SubVoce = element.el.RDF.Annotation.Body[indice].rest.entry.dict.hdwd.$
          sortedArr[indexWordConflicted[indexFinal]].category = element.el.RDF.Annotation.Body[indice].rest.entry.dict.pofs.$
          indexFinal++
          conflictInterface.remove()

       /*    console.log("indexWordConflicted[indexFinal]", indexWordConflicted[indexFinal])
          console.log("indexFinal", indexFinal)
          console.log("sortedArr",sortedArr) */
        }})}catch(error){console.log(error)}

        console.log("words[lastIndex]",  words[lastIndex])
        console.log("lastIndex",  lastIndex)
        
        words[lastIndex].classList.remove("conflicted")
        lastIndex++           
    }) 
  })
  
/*   words[lastIndex].removeEventListener("click", handler) */
}


export { sortedArr }


