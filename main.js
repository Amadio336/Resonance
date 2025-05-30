import { sortedArr } from "./APIs.js"
import { buttonAutomaticResearch, prova } from "./automatic-research.js";




/* phase 1 */

/*  take the elements */

const inputGtx = document.getElementById("input-gtx"); /* input of greek text */
const buttonSubmit = document.getElementById("button-submit");
const poetryCheckbox = document.getElementById("switch-poetry")
const proseCheckbox = document.getElementById("switch-prose")
const specifierMode = document.getElementById("specifier-mode")



const containerPhase2 = document.getElementById("container-phase2");
const visualizedText = document.getElementById("col-greek-text");
const selectionButton = document.getElementById("selection-button");
const selectionAllButton = document.getElementById("selection-all-button");
const gkwValuesArea = document.getElementById("gkw-values-area");
const beginningValues = document.getElementById("beginning-values");
const allowCompleteResearchButton = document.getElementById("allow-complete-research")
const saveGkwValuesButton = document.getElementById("save-gkw-values");
const closeGkwValuesButton = document.getElementById("close-gkw-values")
const SearchBarTag = document.getElementById("search-by-tag")
const makeDiagraph = document.getElementById("make-diagraph");


const sidebarResonanceElements = document.getElementById("main-sidebar");
const tableDiagraph = document.getElementById("table-diagraph");
const mainContainerTableTool = document.getElementById("maincontainer-table-tool");
const chooseTableButton = document.getElementById("choose-table-button");
const addRowButton = document.getElementById("add-row");
const addColButton = document.getElementById("add-col");
const addSeparatorButton = document.getElementById("add-separator");
const sliderSizeTable = document.getElementById("table-size-slider");

/* drang and drop of the cells of diagraph - pahse 3 */

function handleDragEnter(e) {
  e.preventDefault();
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop() {
  console.log("drop");

  if (value == 0) {
    this.appendChild(dragItem);

    const children = this.children;
    console.log(children);
    Array.from(children).forEach((child) => {
      child.className = "on-table";
    });

    if (dragItem.getAttribute("data-separator") == "separator") {
      newSeparator.classList.add("separator");
    }
  } else {
  }
}

let dragItem = null;

let poesiaValue = 0

/* verifier poetry mode */

function specifierProseOrPoetry() {
  if (poesiaValue == 0) {
    specifierMode.textContent = "Modalità Prosa"
    
  } else {
    specifierMode.textContent = "Modalità Poesia"
    
  }
  
}

specifierProseOrPoetry()


poetryCheckbox.addEventListener("click", ()=> {
  poesiaValue = 1
  specifierProseOrPoetry()
})

proseCheckbox.addEventListener("click", ()=>{
  poesiaValue = 0
  specifierProseOrPoetry()
})





/* cleaning greek text  */

buttonSubmit.addEventListener("click", handleGtx);

/* OOP class greekword ------------------------------------ */

class GreekWord {
  constructor(word, matrice = "") {
    this.word = word;
    this.matrice = matrice;
  }

  createWordInserted() {
    let wordInserted = document.createElement("p");
    wordInserted.style.margin = "5px";
    wordInserted.classList.add("highlightable");
    wordInserted.innerHTML = this.word;
    visualizedText.appendChild(wordInserted);
  }
}


/* --------------------------- */

export let arrayCleaned = [];
let objectArraygGkwWithValues = [];

let highlightableGreekWords = null;
let highlightedGreekWords = null;


let indexgkw;
let inputMatrice;




/* function handleGtx > this function cleans greek text and creates element for the phase 2  */
function handleGtx(e) {
  e.preventDefault();
  
  if (poesiaValue == 0) {
    
    let arrayGtxImperfected = inputGtx.value.split("\n");
    let GtxRecomposed = arrayGtxImperfected.join(" ");
    let arrayGtx = GtxRecomposed.split(" ");
    
    arrayGtx.forEach((greekWord) => {
      let cleanedNumber = greekWord.replace(/[1234567890]/, "");
      let cleanedParagraphSign = cleanedNumber.replace(/\[\]/, "");
      arrayCleaned.push(cleanedParagraphSign);
    });
    
    /* adding words in orange container of the phase 2 */
    arrayCleaned.forEach((greekWord) => {
      let newWord = new GreekWord(greekWord);
      newWord.createWordInserted();
      objectArraygGkwWithValues.push(newWord);
    });


    
    
 /*    console.log(objectArraygGkwWithValues); */
    
    /* showing gkws values clicking on a sigle greek word in orange container */
    
    highlightableGreekWords = document.querySelectorAll(".highlightable");
    highlightableGreekWords.forEach((highlightableGreekWord) => {
      highlightableGreekWord.addEventListener("click", handleGkwValues);
    });
    
  } else if(poesiaValue == 1) {

    let arrayPoetry = inputGtx.value.split("\n"); //arrayPoetry is an array in which every element is a line of the poetry

    arrayPoetry.forEach((line) =>{
      const lineSpace = document.createElement("div") // div containing the whole line
      lineSpace.style.display = "block"
      const singleLines = line.split(" ") // array containing every word of a line
     
      singleLines.forEach((singleLine) => {
        const newLine = document.createElement("p")
        newLine.textContent = singleLine
        newLine.style.display = "inline-block"
        newLine.classList.add("highlightable")
        lineSpace.appendChild(newLine)
      })

      visualizedText.appendChild(lineSpace)

    })

    highlightableGreekWords = document.querySelectorAll(".highlightable");
   
   
/*     highlightableGreekWords.forEach((highlightableGreekWord) => {
    highlightableGreekWord.addEventListener("click", handleGkwValues);
    }); */
    

  }


  /* makes appear phase 2. By default phase 2 is setted like display:none */
  containerPhase2.style.display = "block";



}




/* save in an object the values of the greek words given by the user */

function handleGkwValues() {
  
    gkwValuesArea.classList.add("gkw-values-area-appear")
    beginningValues.innerHTML = "";
    indexgkw = Array.from(highlightableGreekWords).indexOf(this);
   
    /* if word's category is "noun" */
   if (sortedArr[indexgkw].category == "noun") {
    
     beginningValues.insertAdjacentHTML(
       "beforeend",  
       `<div class="values"> 
       
       <h5 class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
       <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
       <p> Categoria: ${sortedArr[indexgkw].category} </p>
       <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
       <p> Declinazione: ${sortedArr[indexgkw].decl} </p>
       <p> Caso: </p>
       <p> Genere:  ${sortedArr[indexgkw].gend} </p>
       <p> Numero:  ${sortedArr[indexgkw].num}  </p>

       
       
       </div>`

       
      );            
    
      
 /* if word's category is "verb" */
     
  } else if(sortedArr[indexgkw].category == "verb"){

    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5 class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
      <p> Modo:  ${sortedArr[indexgkw].mood} </p>
      <p> Tempo:  ${sortedArr[indexgkw].tense} </p>
      <p> Persona: </p>
      <p> Radice: </p>
      
      
      </div>`
            
     );
  } else if (sortedArr[indexgkw].category == "adjective"){  /* aggettivi */

    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
      <p> Declinazione: ${sortedArr[indexgkw].decl}  </p>
      <p> Caso : </p>
      <p> Genere: </p>
      <p>: </p>
      <p> : </p>
      
      
      </div>`)


  } else if(sortedArr[indexgkw].category == "pronoun"){

    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
      
      
      </div>`)


  } else if(sortedArr[indexgkw].category == "particle") {
    
    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
   
      
      </div>`)

  } else if(sortedArr[indexgkw].category == "preposition"){

    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
   
      
      </div>`)



  }  else if(sortedArr[indexgkw].category == "article"){

    beginningValues.insertAdjacentHTML(
      "beforeend",  
      `<div class="values"> 
      
      <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
      <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
      <p> Categoria: ${sortedArr[indexgkw].category} </p>
      <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
   
      
      </div>`)

    } else if(sortedArr[indexgkw].category == "conjunction"){

      beginningValues.insertAdjacentHTML(
        "beforeend",  
        `<div class="values"> 
        
        <h5  class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
        <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
        <p> Categoria: ${sortedArr[indexgkw].category} </p>
        <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
     
        
        </div>`)
  
      } else if(sortedArr[indexgkw].category == "adverb"){

        beginningValues.insertAdjacentHTML(
          "beforeend",  
          `<div class="values"> 
          
          <h5 class="title-text">  Parola: ${objectArraygGkwWithValues[indexgkw].word} </h5> </br>
          <p> Descrizione: <input type="text" id="input-matrice" name="matrice" placeholder="scrivi qui" /> </p> </br>
          <p> Categoria: ${sortedArr[indexgkw].category} </p>
          <p> Sub Voce: ${sortedArr[indexgkw].SubVoce} </p>
       
          
          </div>`)
    
        }
  


  inputMatrice = document.getElementById("input-matrice");
      
  saveGkwValuesButton.addEventListener("click", () => {
    highlightableGreekWords.forEach((highlightableGreekWord) => {
      let matriceValue = inputMatrice.value;  
      objectArraygGkwWithValues[indexgkw].matrice = matriceValue; 
    })
 
  console.log("objectarrayWithvalues",objectArraygGkwWithValues);

  });

}


/* button allow complete research */

allowCompleteResearchButton.addEventListener("click", completeResearch)
  
let syncIndex = 0

function completeResearch() { // this function is fundamental, it associates to the object with all the values of a single words the values themselves

  objectArraygGkwWithValues.forEach((value) => {
/* adding values of dict */
    objectArraygGkwWithValues[syncIndex].category = sortedArr[syncIndex].category
    objectArraygGkwWithValues[syncIndex].SubVoce = sortedArr[syncIndex].SubVoce

/* adding values of infl*/
    sortedArr[syncIndex].mood != undefined ? objectArraygGkwWithValues[syncIndex].mood = sortedArr[syncIndex].mood : console.log("no verb")
    sortedArr[syncIndex].tense != undefined ? objectArraygGkwWithValues[syncIndex].tense = sortedArr[syncIndex].tense : console.log("no verb")

    sortedArr[syncIndex].decl != undefined ? objectArraygGkwWithValues[syncIndex].decl = sortedArr[syncIndex].decl : console.log("no noun")
    sortedArr[syncIndex].gend != undefined ? objectArraygGkwWithValues[syncIndex].gend = sortedArr[syncIndex].gend : console.log("no noun")

    syncIndex++
  }
)


  
  


console.log(objectArraygGkwWithValues)

}





/* close the gkws values area */

closeGkwValuesButton.addEventListener("click", ()=>{
    gkwValuesArea.classList.remove("gkw-values-area-appear")
})




/* searchbar by tag >  */

SearchBarTag.addEventListener("keyup", handleSearchByTag)

 function handleSearchByTag(event){
    let searchBarTagValue = SearchBarTag.value

    if (event.key === "Enter") {

      objectArraygGkwWithValues.forEach((objectArraygGkwWithValue) =>{
          if (!searchBarTagValue == "") {

            for (const key in objectArraygGkwWithValue) {

              if (objectArraygGkwWithValue[key] == searchBarTagValue) {
                const indexWordBold = objectArraygGkwWithValues.indexOf(objectArraygGkwWithValue)
                console.log(indexWordBold)
                highlightableGreekWords[indexWordBold].classList.add("bold")
                
              }
            
            }
            
              
           } else if (searchBarTagValue == ""){
             highlightableGreekWords.forEach((highlightableGreekWord) => {
              highlightableGreekWord.classList.remove("bold")
             })
  
          }
      }) 
      
    }


 }









/* making greek words higligted > action on the button SelectionButton  */
selectionButton.addEventListener("click", select);

function select() {

   highlightableGreekWords.forEach((highlightableGreekWord) =>{
    highlightableGreekWord.removeEventListener("click", handleGkwValues)
   }) 


  for (const highlightableGreekWord of highlightableGreekWords) {
    highlightableGreekWord.addEventListener("click", () => {
      highlightableGreekWord.classList.add("highlighted");
    });
  }
}

/* button to select all elements in phase2 > action on the button selectAllButton */
selectionAllButton.addEventListener("click", selectAllElements);

function selectAllElements() {
  highlightableGreekWords = document.querySelectorAll(".highlightable");

  highlightableGreekWords.forEach((highlightableGreekWord) => {
    highlightableGreekWord.classList.add("highlighted");
  });
}
 let resonanceElements = []; // !!!! array with all the resonance elements

/* making the resonance elements for the diagraph > action on button CreateDiagraph */

makeDiagraph.addEventListener("click", createElementForDiagraph);

function createElementForDiagraph() {
  highlightedGreekWords = document.querySelectorAll(".highlighted");
  for (const highlightedWord of highlightedGreekWords) {
    highlightedWord.classList.add("selected");
    /*         highlightedWord.setAttribute("draggable", true)  se vuoi rendere draggabile anche gli elementi nella phase 2 riparti da qui*/
    resonanceElements.push(highlightedWord);
  }

  resonanceElements.forEach((resonanceElement) => {
    const elementOnSidebar = document.createElement("p");
    elementOnSidebar.textContent = resonanceElement.textContent;
    elementOnSidebar.classList.add("resonance-element");
    elementOnSidebar.setAttribute("draggable", true);
    elementOnSidebar.addEventListener("dragstart", handleDragStart);
    sidebarResonanceElements.appendChild(elementOnSidebar);

    elementOnSidebar.addEventListener("dblclick", () => {
      elementOnSidebar.classList.toggle("disp-block");
    });
  });

  console.log(resonanceElements);
}

function handleDragStart() {
  dragItem = this;
}

/* make the sidebar resonace element dynamic */
let SortableSidebar = new Sortable(sidebarResonanceElements, {
  multiDrag: true,
  selectedClass: "sortable-selected",
  animation: 150,
  group: "shared",
});

/* --------------------------------------------- */
/* add separator function */

addSeparatorButton.addEventListener("click", addSeparatorFunction);

let newSeparator = null;

function addSeparatorFunction() {
  newSeparator = document.createElement("div");
  newSeparator.classList.add("resonance-element");
  newSeparator.setAttribute("draggable", true);
  newSeparator.setAttribute("data-separator", "separator");
  newSeparator.addEventListener("dragstart", handleDragStart);
  sidebarResonanceElements.appendChild(newSeparator);
}
/* --------------------------------------------- */

/* TABLE SECTION */

/* button that makes table tool appear */

chooseTableButton.addEventListener("click", () => {
  mainContainerTableTool.classList.remove("hide");
});

let row = null;
let columnsPerRow = null;

const modifier = document.getElementById("modifier");
const unlockButton = document.getElementById("unlock-diagraph");

let value = 0;

modifier.addEventListener("click", () => {
  value = 1;
  console.log("bloocato");
});
unlockButton.addEventListener("click", () => {
  value = 0;
  console.log("accessibile");
});

//  table tool and costruction of table

let cells = document.querySelectorAll(".cell"); // selection of the cells


cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    //function that takes the data value
    row = cell.getAttribute("data-row");
    columnsPerRow = cell.getAttribute("data-column-per-row");
    console.log(row + columnsPerRow);

    /* hide table toll once clicked */
    mainContainerTableTool.classList.add("hide");

    /* creation of main row (category columns) */

    const mainRow = document.createElement("tr");
    mainRow.classList.add("main-row");
    tableDiagraph.appendChild(mainRow);

    for (let i = 0; i < columnsPerRow; i++) {
      const categoryColumn = document.createElement("td");
      const CategoryInput = document.createElement("input");
      CategoryInput.setAttribute("type", "text");
      mainRow.appendChild(categoryColumn);
      categoryColumn.appendChild(CategoryInput);
    }

    for (let i = 0; i < row; i++) {
      // loops that create drag-area table

     let tr = document.createElement("tr");
      tr.classList.add("diagraph-row");
      tableDiagraph.appendChild(tr);

      for (let i = 0; i < columnsPerRow; i++) {
        const td = document.createElement("td");
        td.classList.add("drag-area");
        const resonanceElementPlacheHolder = document.createElement("p");
        resonanceElementPlacheHolder.textContent = "";
        tr.appendChild(td);
        td.appendChild(resonanceElementPlacheHolder);

        /* creation of El on all the drag areas and related functions */

        let dragAreas = document.querySelectorAll(".drag-area");

        dragAreas.forEach((dragArea) => {
          dragArea.addEventListener("dragenter", handleDragEnter);
          dragArea.addEventListener("dragover", handleDragOver);
          dragArea.addEventListener("drop", handleDrop);

          const sortableDragArea = new Sortable(dragArea, {
            group: "shared",
            animation: 150,
          });
        });

        /* drang and drop of the cells of diagraph - pahse 3 */
        /*    function handleDragEnter(e) {
                            e.preventDefault()
                           
                        }

                        function handleDragOver(e) {
                            e.preventDefault()
                            
                        }

                     

                        function handleDrop() {
                         
                            if (value == 0) {
                                
                                dragItem.classList.remove("resonance-element", "already-used", "highlightable", "highlighted",)
                                dragItem.classList.add("on-table")
                                
                                this.appendChild(dragItem)
    
                                if (dragItem.getAttribute("data-separator") =="separator") {
                                    newSeparator.classList.add("separator")    
                                }

                            } else {

                            }

                            
                           
                            
                        } */
      }

      /* creation of speakers columns */
      const speakerColumn = document.createElement("td");
      speakerColumn.classList.add("prova");
      const speakerInput = document.createElement("input");
      speakerInput.setAttribute("type", "text");
      tr.appendChild(speakerColumn);
      speakerColumn.appendChild(speakerInput);
    }
  });
});

/* mouse effects on table tool */

let dataRow = null;
let dataColumnsPerRow = null;

cells.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
     dataRow = cell.getAttribute("data-row");
     dataColumnsPerRow = cell.getAttribute("data-column-per-row");

    for (const cell of cells) {
      if (
        cell.getAttribute("data-row") <= dataRow &&
        cell.getAttribute("data-column-per-row") <= dataColumnsPerRow
      ) {
        cell.classList.add("cell-mouseover");
      }
    }
  });

  cell.addEventListener("mouseout", () => {
    dataRow = cell.getAttribute("data-row");
    dataColumnsPerRow = cell.getAttribute("data-column-per-row");

    for (const cell of cells) {
      if (
        cell.getAttribute("data-row") <= dataRow &&
        cell.getAttribute("data-column-per-row") <= dataColumnsPerRow
      ) {
        cell.classList.remove("cell-mouseover");
      }
    }
  });
});

/* ADDING NEW CATEGORY */

let diagraphRows = null;
let equalizerNewSpeaker = 0;

addColButton.addEventListener("click", () => {
  /* equalizer */
  equalizerNewSpeaker++;

  const mainRow = document.querySelector(".main-row");
  diagraphRows = document.querySelectorAll(".diagraph-row");

  /* add a column to main row */
  const newCateogryCol = document.createElement("td");
  const newCategoryInput = document.createElement("input");
  newCategoryInput.setAttribute("type", "text");
  newCateogryCol.appendChild(newCategoryInput);
  mainRow.appendChild(newCateogryCol);

  /* creation of new category script */
  diagraphRows.forEach((diagraphRow) => {
    const newCol1 = document.createElement("td");
    newCol1.classList.add("drag-area");
    diagraphRow.insertAdjacentElement("afterbegin", newCol1);
  });

  const dragAreas = document.querySelectorAll(".drag-area");

  dragAreas.forEach((dragArea) => {
    const sortableDragArea = new Sortable(dragArea, {
      group: "shared",
      swapThreshold: 1,
      animation: 150,
    });

    dragArea.addEventListener("dragenter", handleDragEnter);
    dragArea.addEventListener("dragover", handleDragOver);
    dragArea.addEventListener("drop", handleDrop);
  });
});

/* adding new speaker */

addRowButton.addEventListener("click", function () {
  const newRow = document.createElement("tr");
  newRow.classList.add("diagraph-row");
  tableDiagraph.appendChild(newRow);

  for (let i = 0; i < Number(columnsPerRow) + equalizerNewSpeaker; i++) {
    const newCol = document.createElement("td");
    newCol.classList.add("drag-area");
    newRow.appendChild(newCol);
  }

  const dragAreas = document.querySelectorAll(".drag-area");

  dragAreas.forEach((dragArea) => {
    const sortableDragArea = new Sortable(dragArea, {
      group: "shared",
      swapThreshold: 1,
      animation: 150,
    });

    dragArea.addEventListener("dragenter", handleDragEnter);
    dragArea.addEventListener("dragover", handleDragOver);
    dragArea.addEventListener("drop", handleDrop);
  });

  const inputSpeakerCol = document.createElement("td");
  inputSpeakerCol.classList.add("prova");
  const newCategoryInput = document.createElement("input");
  newCategoryInput.setAttribute("type", "text");
  inputSpeakerCol.appendChild(newCategoryInput);
  newRow.insertAdjacentElement("beforeend", inputSpeakerCol);
});

/* handling of slider for table size */

sliderSizeTable.addEventListener("click", () => {
  const diagraphRows = document.querySelectorAll(".diagraph-row");
  console.log(diagraphRows);
  let tableSize = sliderSizeTable.value;

  diagraphRows.forEach((diagraphRow) => {
    diagraphRow.style.height = `${tableSize}px`;
  });
});




buttonAutomaticResearch.addEventListener("click", prova)



export {handleGkwValues}