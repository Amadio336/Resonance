/* phase 1 */


/*  take the elements */


const inputGtx = document.getElementById("input-gtx") /* input of greek text */
const buttonSubmit = document.getElementById("button-submit") /* button that cleans text e create selectable text */


const containerPhase2 = document.getElementById("container-phase2")
const visualizedText = document.getElementById("col-greek-text")
const selectionButton = document.getElementById("selection-button")
const makeDiagraph = document.getElementById("make-diagraph")


const sidebarResonanceElements = document.getElementById("main-sidebar")
const tableDiagraph = document.getElementById("table-diagraph")
const mainContainerTableTool = document.getElementById("maincontainer-table-tool")
const chooseTableButton = document.getElementById("choose-table-button")
const addRowButton =document.getElementById("add-row")
const addColButton =document.getElementById("add-col")


/* drang and drop of the cells of diagraph - pahse 3 */
function handleDragEnter(e) {
    e.preventDefault()
    console.log("element entered") 
}

function handleDragOver(e) {
    e.preventDefault()
    console.log("dragover") 
}

function handleDrop() {
    this.append(dragItem)
}




let dragItem = null

/* cleaning greek text  */

buttonSubmit.addEventListener("click", handleGtx)


let arrayCleaned = []

/* function handleGtx */
function handleGtx(e) {
    e.preventDefault()


    let arrayGtxImperfected = inputGtx.value.split("\n")
    let GtxRecomposed = arrayGtxImperfected.join(" ")
    let arrayGtx = GtxRecomposed.split(" ")
    
    arrayGtx.forEach(greekWord => {
        let cleanedNumber = greekWord.replace(/[1234567890]/, "")
        let cleanedParagraphSign = cleanedNumber.replace(/\[\]/, "")
        arrayCleaned.push(cleanedParagraphSign)
       
    }) 

    console.log(arrayCleaned)


    arrayCleaned.forEach(greekWord => {
        let wordInserted = document.createElement("p")
    /*     wordInserted.style.display ="inline-block" */
        wordInserted.style.margin = "5px"
        wordInserted.classList.add("highlightable")
        wordInserted.innerHTML = greekWord
        visualizedText.appendChild(wordInserted)
    })

    containerPhase2.style.display = "block"



     
}



/* phase 2*/


/* making greek words highlightable  */

let highlightableGreekWords = null
let highlightedGreekWords = null

selectionButton.addEventListener("click", select)

function select() {
    highlightableGreekWords = document.querySelectorAll(".highlightable")
    
    for (const highlightableGreekWord of highlightableGreekWords) {
        highlightableGreekWord.addEventListener("click", () => {highlightableGreekWord.classList.add("highlighted")})  
    }    
}


/* making the resonance elements for the diagraph */

makeDiagraph.addEventListener("click", createElementForDiagraph)


resonanceElements = [] // !!!! array with all the resonance elements

function createElementForDiagraph() {
    highlightedGreekWords = document.querySelectorAll(".highlighted")
    for (const highlightedWord of highlightedGreekWords) {        
        highlightedWord.classList.add("resonance-element")
        highlightedWord.setAttribute("draggable", true)
        sidebarResonanceElements.appendChild(highlightedWord)
        highlightedWord.addEventListener("dragstart", handleDragStart)
        resonanceElements.push(highlightedWord)
    }

    resonanceElements.forEach(resonanceElement => {
        resonanceElement.addEventListener("dblclick", () =>{
            resonanceElement.classList.toggle("disp-block")
        })

    })

    console.log(resonanceElements)
}



function handleDragStart(){
    this.classList.add("already-used")
    dragItem = this
    console.log(dragItem)

}





/* button that makes table tool appear */

chooseTableButton.addEventListener("click", () => {
   mainContainerTableTool.classList.remove("hide")
    
})




let row = null
let columnsPerRow = null



//  table tool and costruction of table

cells = document.querySelectorAll(".cell") // selection of the cells

cells.forEach(cell => {
    cell.addEventListener("click", () =>{    //function that takes the data value 
       row = cell.getAttribute("data-row")
       columnsPerRow = cell.getAttribute("data-column-per-row")
       console.log(row + columnsPerRow)


       /* hide table toll once clicked */
       mainContainerTableTool.classList.add("hide")


    /* creation of main row (category columns) */

        const mainRow = document.createElement("tr")
        mainRow.classList.add("main-row")
        tableDiagraph.appendChild(mainRow)

        for (let i = 0; i < columnsPerRow; i++) {
           const categoryColumn = document.createElement("td")
           const CategoryInput = document.createElement("input")
           CategoryInput.setAttribute("type", "text")
           mainRow.appendChild(categoryColumn)
           categoryColumn.appendChild(CategoryInput)
        }







       
       for (let i = 0; i < row; i++) {   // loops that create drag-area table

        tr = document.createElement("tr")
        tr.classList.add("diagraph-row")
        tableDiagraph.appendChild(tr)
     
        for (let i = 0; i < columnsPerRow; i++) {
            const td = document.createElement("td")
            td.classList.add("drag-area")
            const resonanceElementPlacheHolder = document.createElement("p")
            resonanceElementPlacheHolder.textContent = ""
            tr.appendChild(td)
            td.appendChild(resonanceElementPlacheHolder)





                /* creation of El on all the drag areas and related functions */
               const dragAreas = document.querySelectorAll(".drag-area")

              dragAreas.forEach(dragArea => {
                      dragArea.addEventListener("dragenter", handleDragEnter)
                      dragArea.addEventListener("dragover", handleDragOver)
                      dragArea.addEventListener("drop", handleDrop)
                  })
  
                     /*  function handleDragEnter(e) {
                          e.preventDefault()
                          console.log("element entered") 
                      }
  
                      function handleDragOver(e) {
                          e.preventDefault()
                          console.log("dragover") 
                      }
  
                      function handleDrop() {
                          this.append(dragItem)
                      }
                    */
                    } 
                
        /* creation of speakers columns */
         const speakerColumn = document.createElement("td")
         speakerColumn.classList.add("prova")
         const speakerInput = document.createElement("input")
         speakerInput.setAttribute("type", "text")
         tr.appendChild(speakerColumn) 
         speakerColumn.appendChild(speakerInput)
                
        
                
                }



      
       
        
}) 
})




/* mouse effects on table tool */

cells.forEach(cell => {
    cell.addEventListener("mouseover", () => {
        dataRow = cell.getAttribute("data-row")
        dataColumnsPerRow = cell.getAttribute("data-column-per-row")

        for (const cell of cells) {
            if (cell.getAttribute("data-row") <= dataRow && cell.getAttribute("data-column-per-row") <= dataColumnsPerRow) {
                cell.classList.add("cell-mouseover")
                
            }
            
        }
        
        
    })


    cell.addEventListener("mouseout", () => {
        dataRow = cell.getAttribute("data-row")
        dataColumnsPerRow = cell.getAttribute("data-column-per-row")

        for (const cell of cells) {
            if (cell.getAttribute("data-row") <= dataRow && cell.getAttribute("data-column-per-row") <= dataColumnsPerRow) {
                cell.classList.remove("cell-mouseover")
                
            }
            
        }
        
    })



})


/* adding new category */

let diagraphRows = null
let equalizerNewSpeaker = 0

addColButton.addEventListener("click", () => {

    /* equalizer */
    equalizerNewSpeaker++
    



    const mainRow = document.querySelector(".main-row")
    diagraphRows = document.querySelectorAll(".diagraph-row")

    /* add a column to main row */
    const newCateogryCol = document.createElement("td")
    const newCategoryInput = document.createElement("input")
    newCategoryInput.setAttribute("type", "text")
    newCateogryCol.appendChild(newCategoryInput)
    mainRow.appendChild(newCateogryCol)
    



    /* creation of new category script */
    diagraphRows.forEach(diagraphRow => {
        const newCol1 = document.createElement("td")
        newCol1.classList.add("drag-area")
        diagraphRow.insertAdjacentElement("afterbegin", newCol1)
    })


    const dragAreas = document.querySelectorAll(".drag-area")

    dragAreas.forEach(dragArea => {
            dragArea.addEventListener("dragenter", handleDragEnter)
            dragArea.addEventListener("dragover", handleDragOver)
            dragArea.addEventListener("drop", handleDrop)
        })

    

})




/* adding new speaker */

addRowButton.addEventListener("click", function(){
    const newRow = document.createElement("tr")
    newRow.classList.add("diagraph-row")
    tableDiagraph.appendChild(newRow)


    for (let i = 0; i < (Number(columnsPerRow) + equalizerNewSpeaker); i++) {
        const newCol = document.createElement("td")
        newCol.classList.add("drag-area")
        newRow.appendChild(newCol)  

       
    }

    const dragAreas = document.querySelectorAll(".drag-area")

    dragAreas.forEach(dragArea => {
            dragArea.addEventListener("dragenter", handleDragEnter)
            dragArea.addEventListener("dragover", handleDragOver)
            dragArea.addEventListener("drop", handleDrop)
        })


    const inputSpeakerCol = document.createElement("td")
    inputSpeakerCol.classList.add("prova")
    const newCategoryInput = document.createElement("input")
    newCategoryInput.setAttribute("type", "text")
    inputSpeakerCol.appendChild(newCategoryInput)
    newRow.insertAdjacentElement("beforeend", inputSpeakerCol)

})


