

/* this part aims to provide main.js grammar info about words provided */

const inputGtx = document.getElementById("input-gtx")
const buttonSubmit = document.getElementById("button-submit")

let index = 0;
let cleanedGText = []; // viene creato un array dove ogni elemento di arr1 viene trasformato in un oggetto con il suo indice
let sortedArr = [];


buttonSubmit.addEventListener("click", searchFlection)


function searchFlection() {
  

 let rowGText = inputGtx.value;
let splittedGtext = rowGText.split(" "); // viene trasformato in un array con split, ogni spazio è un elemento



splittedGtext.forEach((gkw) => { // prendere gli elementi di arr1, ci mette un indce e le mette dentro arr2
  const gkwObj = {
    word: gkw,
    id: index,
  };
  
  cleanedGText.push(gkwObj);
  
  index++; // incrementa l'indice

 console.log(cleanedGText) 
});


cleanedGText.forEach((gkw) => {
 
  fetch(
    `http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=${gkw.word}`  // viene fatta una richiesta per la flessione di una parola
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonFIle = JSON.parse(data);

  /*     console.log(jsonFIle)  */
   let objLenght = jsonFIle.RDF.Annotation.Body.length

   if (objLenght === undefined) {
    const notSortedObj = {
      SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
      category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
      id: gkw.id,
    };
    sortedArr.push(notSortedObj);
    sortedArr.sort((a, b) => a.id - b.id);

   } else if(objLenght > 1){

    const notSortedObj = {
      SubVoce: jsonFIle.RDF.Annotation.Body[0].rest.entry.dict.hdwd.$ ,
      category: jsonFIle.RDF.Annotation.Body[0].rest.entry.dict.pofs.$,
      id: gkw.id,
    };
    sortedArr.push(notSortedObj);
    sortedArr.sort((a, b) => a.id - b.id);
   

   }


 
    })
     .catch((error) => {
     
      console.log("Errore nel recupero dati:", error)

      const notSortedObj = {
        id: gkw.id,
      };

      sortedArr.push(notSortedObj)
      sortedArr.sort((a, b) => a.id - b.id);

      


    });
 
    
    
  });
  
 
   console.log("sorted Arr", sortedArr) 
  
}


export { sortedArr }


