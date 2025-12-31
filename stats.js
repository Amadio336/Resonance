import { sortedArr } from "./APIs.js"
import { inputGtx } from "./main.js"


let words = []
const showMoreButton = document.querySelector("#show-more-button")


function takeWords() {
     const highlightableWords = document.querySelectorAll(".highlightable")
    
     highlightableWords.forEach((element) =>{
            words.push(element.textContent)
        })
}

/* this function generates small stats on the toolbar of phase2 */
function genSmStats() {

    try {    
        let statsArea = document.getElementById("stats-area")
        let statsLemmasContainer = document.getElementById("stats-lemmas-container")
        let statsWordsContainer = document.getElementById("stats-word-container")
        let genStatsButton = document.getElementById("generate-small-stats")
        takeWords()
     

      

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
        statsArea.insertAdjacentHTML("afterbegin", `<p class="title-text-violet mt-3 mb-3">Parole totali: ${words.length}</p>`)





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

function activeShowMoreAnim(){
    /* this function is the beginning of the creation of Big Stats Interface. When the Show More Button is pressed, this is 
    the fist function called; it does nothing but enabling event listeners */

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


function populateBgStats(){
    /* this function is the core of Bg Stats. It deals with calculating the stats and creating the HTML element in order to show them */

    /* creating the buffer 100% */
     showMoreWrapper.insertAdjacentHTML('beforeend',
            ` <div class="wrapper-percentage"> 
                <div class="twenty-five-bar"> 25%</div>
            </div>
           `)
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
        takeWords()

        console.log("words", words)
        console.log("SortedArr from stats.js", sortedArr)
        console.log("testo", inputGtx.value)


       
    }


    
}


function hideBgStatsInterface(){
    showMoreWrapper.classList.add("hide")
    showMoreButton.classList.remove("animate")
    isHiddenShowMore = true
    showMoreButton.insertAdjacentHTML("afterbegin", "<span> nascosto</span>")

     const span = showMoreButton.querySelector('span.mt-4');
if (span) {
    span.remove();
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
        showMoreButton.insertAdjacentHTML("afterbegin", "<span class='mt-4'> Mostra di più</p>")
    }

 
}





export { genSmStats, activeShowMoreAnim }