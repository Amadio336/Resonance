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

function activeShowMoreAnim(){
    showMoreButton.addEventListener("click", animate)
}

function animate(){
    showMoreButton.innerHTML = ""
    showMoreButton.classList.add("animate")
}






export { genSmStats, activeShowMoreAnim }