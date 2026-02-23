
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



function manageMorePossibilities(jsonFIle, shortPath) {
  const total_possibilities = []

  for (const el of shortPath){
    total_possibilities.push(el)
  }

  return total_possibilities
  
}




 export async function searchFlection(e) {
  e.preventDefault()
  

 
 let rowGText = inputGtx.value; 
 let noBreakLines = inputGtx.value.replaceAll("\n", " ")
 let rowGTextSplitted = noBreakLines.split(" ")
 
 let splittedGtext =[]

 /* this loop take every word individually from text-area and deletes numbers and parentesis. After this, it pushes the word in splittedGtext */
 rowGTextSplitted.forEach((greekWord) => {
      let cleanedNumber = greekWord.replace(/[1234567890]/, "");
      let cleanedParagraphSign = cleanedNumber.replace(/\[\]/, "");
      splittedGtext.push(cleanedParagraphSign.trim());
    });


splittedGtext.forEach((gkw) => { 
  console.log("gkw", gkw)
  /* this if statement deals with preventing empty string from to be considered as a word */
  if (gkw.trim() != ""){
  const gkwObj = {
    word: gkw.replace("\n", "").trim(),
    id: index,};
  cleanedGText.push(gkwObj);
  index++;}
});
 
let allJsonFiles = []
let indexJsonReturned =0
 

console.log("cleanedGText", cleanedGText)

cleanedGText.forEach((gkw) => {

  try{
  fetch(
    `https://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=${gkw.word}`  // viene fatta una richiesta per la flessione di una parola
  )
  .then((response) => response.text())
  .then((data) => {
    const jsonFIle = JSON.parse(data);
    
  
    console.log(jsonFIle)
    
    
    
    
    
  /* variabile che contiene la lunghezza della chiave Body  */
  
   let objLenght = jsonFIle.RDF.Annotation.Body.length
   console.log("objLenght",objLenght)


  /* that is, if Body is a one-element list. It means that word is not C */
   if (objLenght === undefined) {
       const shortPath =  jsonFIle.RDF.Annotation.Body.rest.entry.infl

      /* if not omonymous word is a noun */
    if (jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "noun") {
  
      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        gend:  jsonFIle.RDF.Annotation.Body.rest.entry.dict.gend.$,
        decl: jsonFIle.RDF.Annotation.Body.rest.entry.dict.decl.$,
        id: gkw.id,
      };


      if (shortPath.length == undefined){
        notSortedObj.case = shortPath.case.$
        notSortedObj.number = shortPath.num.$
      }else if (shortPath.length > 1){
        notSortedObj.c = "more infl"
        notSortedObj.case = shortPath[0].case.$
        notSortedObj.number = shortPath[0].num.$
        notSortedObj.possibilities = manageMorePossibilities(jsonFIle, shortPath)
      }

      sortedArr.push(notSortedObj);
      sortedArr.sort((a, b) => a.id - b.id);

    } else if (jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$ == "verb"){  

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };

       if (shortPath.length == undefined){
        notSortedObj.mood = shortPath.mood.$
        notSortedObj.tense = shortPath.tense.$
      }
       else if (shortPath.length > 1){
          notSortedObj.c = "more infl"
          notSortedObj.mood = shortPath[0].mood.$
          notSortedObj.tense = shortPath[0].tense.$
          notSortedObj.possibilities = manageMorePossibilities(jsonFIle, shortPath)

      }



          /* these two lines manage the problem infl has more than only one object. If infl has only one object, it takes normally the value of verb.tense and verb.mood, otherwise it takes the first result */
        /*   jsonFIle.RDF.Annotation.Body.rest.entry.infl.length == undefined ? notSortedObj.mood = jsonFIle.RDF.Annotation.Body.rest.entry.infl.mood.$ : notSortedObj.mood = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].mood.$
          jsonFIle.RDF.Annotation.Body.rest.entry.infl.length == undefined ? notSortedObj.tense = jsonFIle.RDF.Annotation.Body.rest.entry.infl.tense.$ : notSortedObj.tense = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].tense.$ 
       */

          /* this two if statements add case and number to participles, both those with a infl.legnth >0 and those with inf.lengt = 1 or undefined */
          /* infl.length > 1 or != undefined */
          if (jsonFIle.RDF.Annotation.Body.rest.entry.infl.length != undefined && jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].mood.$ == "participle"){
          notSortedObj.participleCase = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].case.$
          notSortedObj.participleNumber = jsonFIle.RDF.Annotation.Body.rest.entry.infl[0].num.$
            
          }
          /* infl.length == 1 or == undefined */
          if (jsonFIle.RDF.Annotation.Body.rest.entry.infl.length == undefined && jsonFIle.RDF.Annotation.Body.rest.entry.infl.mood.$ == "participle"){
          notSortedObj.participleCase = jsonFIle.RDF.Annotation.Body.rest.entry.infl.case.$
          notSortedObj.participleNumber = jsonFIle.RDF.Annotation.Body.rest.entry.infl.num.$
            
          } 

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

      if (shortPath.length == undefined){
        notSortedObj.case = shortPath.case.$
        notSortedObj.number = shortPath.num.$
      }else if (shortPath.length > 1){
        notSortedObj.c = "more infl"
        notSortedObj.case = shortPath[0].case.$
        notSortedObj.number = shortPath[0].num.$
        notSortedObj.possibilities = manageMorePossibilities(jsonFIle, shortPath)

      }


   
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
  } /* qui si chiude il try prima di fetch */
    catch (error){console.log(error)}  
  });
  
 
    console.log("sorted Arr", sortedArr)  
    
  const inputOrAutoInt = document.querySelector(".import-or-auto-interface")
  inputOrAutoInt.remove()
  
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
    
    let wordWithUrns =  `urn:word:${word.textContent.trim()}`
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
   /* create skip interface */
    event.preventDefault(); // Blocca il menu contestuale del browser
    const divSkip = document.createElement("div")
    divSkip.classList.add("skip-button")
    word.appendChild(divSkip)

    let skipButton = document.createElement("span")
    skipButton.textContent = "salta"
    divSkip.appendChild(skipButton)
    skipButton.addEventListener("click", skipWord)

    let closeDivSkip = document.createElement("span")
    closeDivSkip.style.display = "block"
    closeDivSkip.textContent = "chiudi"
    divSkip.insertAdjacentElement("afterbegin", closeDivSkip)
    closeDivSkip.addEventListener("click", ()=>{divSkip.remove()})
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
    

    
    

    if (URNCleaned.normalize("NFC") == word.textContent.normalize("NFC").trim() && element.elId == word.getAttribute("data-index-word")) {
      
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
          console.log("il problema è qui")
          return
        }else{
          URNCleaned = element.el.RDF.Annotation.hasTarget.Description.about.replace("urn:word:", "")
        }
      
        
        if (URNCleaned.normalize("NFC") == word.textContent.normalize("NFC").trim()  && element.elId == word.getAttribute("data-index-word")) {
          sortedArr[indexWordConflicted[indexFinal]].SubVoce = element.el.RDF.Annotation.Body[indice].rest.entry.dict.hdwd.$
          sortedArr[indexWordConflicted[indexFinal]].category = element.el.RDF.Annotation.Body[indice].rest.entry.dict.pofs.$

          if (sortedArr[indexWordConflicted[indexFinal]].category == "noun"){
            /* set gend, declension */
            sortedArr[indexWordConflicted[indexFinal]].gend = element.el.RDF.Annotation.Body[indice].rest.entry.dict.gend.$
            sortedArr[indexWordConflicted[indexFinal]].decl = element.el.RDF.Annotation.Body[indice].rest.entry.dict.decl.$

          }

          if (sortedArr[indexWordConflicted[indexFinal]].category == "verb"){

         /* set mood and tense */
            if (element.el.RDF.Annotation.Body[indice].rest.entry.infl.length == undefined){
              sortedArr[indexWordConflicted[indexFinal]].mood = element.el.RDF.Annotation.Body[indice].rest.entry.infl.mood.$
              sortedArr[indexWordConflicted[indexFinal]].tense = element.el.RDF.Annotation.Body[indice].rest.entry.infl.tense.$

            }


           
            /* set mood, tense.  The value is abitrary set to 0 TODO:. The problem is that some words has infl.lenght > 1, for instance εχει, it coulb be 3sin act or 2 sing medio passive.  */
            if (element.el.RDF.Annotation.Body[indice].rest.entry.infl.length != undefined){
              sortedArr[indexWordConflicted[indexFinal]].mood = element.el.RDF.Annotation.Body[indice].rest.entry.infl[0].mood.$
              sortedArr[indexWordConflicted[indexFinal]].tense = element.el.RDF.Annotation.Body[indice].rest.entry.infl[0].tense.$

            }



           
          }


          indexFinal++
          conflictInterface.remove()

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


