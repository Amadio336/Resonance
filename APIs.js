/* this part aims to provide main.js grammar info about words provided */

let rowGText = "μὲν ὑμεῖς, ἄνδρες Ἀθηναῖοι, πεπόνθατε ὑπὸ τῶν ἐμῶν";

let splittedGtext = rowGText.split(" "); // viene trasformato in un array con split, ogni spazio è un elemento

let index = 0;
let cleanedGText = []; // viene creato un array dove ogni elemento di arr1 viene trasformato in un oggetto con il suo indice
let sortedArr = [];

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
    `http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=${gkw.word}`  // viene fatta una richiesta per la flessione di una parola
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonFIle = JSON.parse(data);

      console.log(jsonFIle)

      const notSortedObj = {
        SubVoce: jsonFIle.RDF.Annotation.Body.rest.entry.dict.hdwd.$ ,
        category: jsonFIle.RDF.Annotation.Body.rest.entry.dict.pofs.$,
        id: gkw.id,
      };
     sortedArr.push(notSortedObj);
     sortedArr.sort((a, b) => a.id - b.id);

    })
    .catch((error) => console.error("Errore nel recupero dati:", error));
    
    
  });
  
 
  console.log(sortedArr)




export { sortedArr }


