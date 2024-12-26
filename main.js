/* phase 1 */


/*  take the elements */
const inputGtx = document.getElementById("input-gtx")
const buttonSubmit = document.getElementById("button-submit")




/* creation of El on buttonSubmit. it creates a function that cleans the greek text */
buttonSubmit.addEventListener("click", handleGtx)



/* function handleGtx */
function handleGtx(e) {
    e.preventDefault()

     
}















/* phase 3 */
const resonanceElements = document.querySelectorAll(".resonance-element")
const dragAreas = document.querySelectorAll(".drag-area")
let dragItem = null



/* creation of El on all the resonance element and related functions */

resonanceElements.forEach(resonanceElement => {
    resonanceElement.addEventListener("dragstart", handleDragStart)
    }) 



function handleDragStart(){
  
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

