/*  take the elements */
const inputGtx = document.getElementById("input-gtx")
const buttonSubmit = document.getElementById("button-submit")




/* creation of El on buttonSubmit */
buttonSubmit.addEventListener("click", handleGtx)



/* function handleGtx */
function handleGtx(e) {
    e.preventDefault()
   let rowGtx = inputGtx.value
   console.log(rowGtx)
   let noCommaGtx = rowGtx.replace(/,/g, " ")
   console.log(noCommaGtx)     
}