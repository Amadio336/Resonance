import { sortedArr } from "./APIs.js"


let words = []
const showMoreButton = document.querySelector("#show-more-button")


/* this function generates small stats on the toolbar of phase2 */
function genSmStats() {

    try {    
        let statsArea = document.getElementById("stats-area")
        let statsLemmasContainer = document.getElementById("stats-lemmas-container")
        let statsWordsContainer = document.getElementById("stats-word-container")
        let genStatsButton = document.getElementById("generate-small-stats")


        const highlightableWords = document.querySelectorAll(".highlightable")
        highlightableWords.forEach((element) =>{
            words.push(element.textContent)
        })


        /* LEMMAS */     
        /* it stands for SortedArrCopy */
        let SACopy = [...sortedArr]
        
        let statsLemmas = {}
        SACopy.forEach((element) => {
            if (!statsLemmas[element["SubVoce"]]) {
                statsLemmas[element["SubVoce"]] = 0
            }
            statsLemmas[element["SubVoce"]]++
        })
        
        /* descending orderdering of the stats   */
        let statsLemmasOrdered = Object.entries(statsLemmas).sort((a, b) => b[1] - a[1])
        
        /* put on screen the first 5 most occurred lemmas */
        statsLemmasContainer.insertAdjacentHTML("afterbegin", '<p class="title-text-violet"> Lemmi più ricorrenti </p>') 
        for (let i = 0; i < 5; i++) {
            const lemma = document.createElement("p")
            lemma.textContent = `${i + 1}) ${statsLemmasOrdered[i][0]}: ${statsLemmasOrdered[i][1]}, ~${Math.round(parseInt(statsLemmasOrdered[i][1]) *100 / parseInt(words.length))}%`
            statsLemmasContainer.appendChild(lemma)
        }

        /* WORDS */       
        

        let statsWords = {}
        words.forEach((element) =>{
            if(!statsWords[element]) statsWords[element] =0
            statsWords[element]++

        })

        let statsWordsOrdered = Object.entries(statsWords).sort((a, b) => b[1] - a[1])

         statsWordsContainer.insertAdjacentHTML("afterbegin", '<p class="title-text-violet"> Parole più ricorrenti </p>') 
        for (let i = 0; i < 5; i++) {
            const word = document.createElement("p")
            word.textContent = `${i + 1}) ${statsWordsOrdered[i][0]}: ${statsWordsOrdered[i][1]}`
            statsWordsContainer.appendChild(word)
        }



        /* counter all word */
        statsArea.insertAdjacentHTML("afterbegin", `<p class="title-text-violet mt-5 mb-5">Parole totali: ${words.length}</p>`)





        /* disabling button genstats */
        genStatsButton.disabled = true
        genStatsButton.classList.add("hide")




    } catch (error) {
        console.log("Errore: ", error)
    }



}

const showMoreWrapper = document.getElementById("show-more-wrapper")

let isOpenShowMore = false
let isHiddenShowMore = false

/* this function is the beginning of the creation of Big Stats Interface */
function activeShowMoreAnim(){
    /* clicking on the button Show More makes the animation start */
    showMoreButton.addEventListener("dblclick", animate)

    showMoreButton.addEventListener("dblclick", showAgain)
    /* at the end of animation, generates Big Stats Interface */
    showMoreButton.addEventListener("animationend", createBgStats)
}

/* this f manages the animation of show more button */
function animate(){
    if (isOpenShowMore == false){
        isOpenShowMore = true
        showMoreButton.classList.add("animate")
    }
}

/* this f generates Bg Stats Interface */
function  createBgStats() {
    
    if(isHiddenShowMore == false){

        /* button hide */
        const hideShowMoreButton = document.createElement("button")
        hideShowMoreButton.textContent = "Nascondi"
        hideShowMoreButton.className = "button-beige mt-4"
        showMoreWrapper.appendChild(hideShowMoreButton)
        hideShowMoreButton.addEventListener("click", hideBgStatsInterface)
        
        
        /* button close */
        const delShowMoreButton = document.createElement("button")
        delShowMoreButton.textContent = "Chiudi"
        delShowMoreButton.className = "button-beige mt-4"
        showMoreWrapper.appendChild(delShowMoreButton)
        delShowMoreButton.addEventListener("click", delBgStatsInterface)



        showMoreWrapper.insertAdjacentHTML("beforeend","<p> ciao come stai </p> ")
    }


    
}


function hideBgStatsInterface(){
    showMoreButton.classList.remove("animate")
    showMoreWrapper.classList.add("hide")
    isHiddenShowMore = true
    showMoreButton.insertAdjacentHTML("afterbegin", "<span> nascosto</span>")

    const p = showMoreButton.querySelector('span');
if (p) {
    p.remove();
}


    
   
}


function showAgain(){
    if (isHiddenShowMore == true){
        showMoreButton.classList.add("animate")
        setTimeout(()=>{showMoreWrapper.classList.remove("hide")}, 700)

        if(showMoreButton.firstElementChild){
            showMoreButton.firstElementChild.remove()
        }

    }
}

function delBgStatsInterface(){
    showMoreButton.classList.remove("animate")
    showMoreWrapper.innerHTML = ""
    console.log(showMoreButton)
    isOpenShowMore = false
    isHiddenShowMore = false

    if (showMoreButton.firstElementChild.tagName !== 'SPAN'){
        showMoreButton.insertAdjacentHTML("afterbegin", "<span class='mt-4'> show More</p>")
    }

 
}





export { genSmStats, activeShowMoreAnim }