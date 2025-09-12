import { sortedArr } from "./APIs.js"


function genSmStats() {   
   /* it stands for SortedArrCopy */
    let SACopy = [...sortedArr]
   
    let statsLemmas = {} 
    SACopy.forEach((element) =>{
     
        if(!statsLemmas[element["SubVoce"]]){
            statsLemmas[element["SubVoce"]] = 0
        }
        statsLemmas[element["SubVoce"]]++ 
    })

    let statsLemmasOrdered = Object.entries(statsLemmas).sort((a,b) => b[1] - a[1])


    let statsArea = document.getElementById("stats-area")
    const statsLemmasContainer = document.createElement("div")
    statsArea.appendChild(statsLemmasContainer)
    
    for (let i = 0; i < 5; i++){
        const lemma = document.createElement("p")
        lemma.textContent = `${i+1}) ${statsLemmasOrdered[i][0]}: ${statsLemmasOrdered[i][1]}`
        statsLemmasContainer.appendChild(lemma)



    }


}








export {genSmStats}