/* phase 1 */


/*  take the elements */


const inputGtx = document.getElementById("input-gtx") /* input of greek text */
const buttonSubmit = document.getElementById("button-submit") /* button that cleans text e create selectable text */


const containerPhase2 = document.getElementById("container-phase2")
const visualizedText = document.getElementById("col-greek-text")
const selectionButton = document.getElementById("selection-button")
const makeDiagraph = document.getElementById("make-diagraph")


const sidebarResonanceElements = document.getElementById("main-sidebar")


let dragItem = null

/* creation of El on buttonSubmit. it creates a function that cleans the greek text */
buttonSubmit.addEventListener("click", handleGtx)


let arrayCleaned = []

/* function handleGtx */
function handleGtx(e) {
    e.preventDefault()
    let arrayGtx = inputGtx.value.split(" ")
    arrayGtx.forEach(greekWord => {
        let cleanedNumber = greekWord.replace(/[1234567890]/, "")
        let cleanedParagraphSign = cleanedNumber.replace(/\[\]/, "")
        arrayCleaned.push(cleanedParagraphSign)
       
    })

    console.log(arrayCleaned)


    arrayCleaned.forEach(greekWord => {
        let wordInserted = document.createElement("p")
        wordInserted.style.display ="inline-block"
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

function createElementForDiagraph() {
    highlightedGreekWords = document.querySelectorAll(".highlighted")
    for (const highlightedWord of highlightedGreekWords) {
        highlightedWord.classList.add("resonance-element")
        highlightedWord.setAttribute("draggable", true)
        sidebarResonanceElements.appendChild(highlightedWord)
        

        highlightedWord.addEventListener("dragstart", handleDragStart)
    }

    
}













const dragAreas = document.querySelectorAll(".drag-area")






function handleDragStart(){
    console.log("funziona")
    this.classList.add("already-used")
    dragItem = this
    console.log(dragItem)

}





/* creation of El on all the drag areas and related functions */

dragAreas.forEach(dragArea => {
    dragArea.addEventListener("dragenter", handleDragEnter)
    dragArea.addEventListener("dragover", handleDragOver)
    dragArea.addEventListener("drop", handleDrop)
})

function handleDragEnter(e) {
    console.log("element entered")
    
}

function handleDragOver(e) {
    e.preventDefault()
    console.log("dragover")
    
}

function handleDrop() {
    this.append(dragItem)
    
}

