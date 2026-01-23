import { sortedArr } from "./APIs.js"
import { inputGtx } from "./main.js"

const showMoreButton = document.querySelector("#show-more-button")
const showMoreWrapper = document.getElementById("show-more-wrapper")
const showMoreWrapperButtonWrapper = document.getElementById("button-wrapper")
const showMoreWrapperContentWrapper = document.getElementById("content-wrapper")
const showMoreWrapperSubContentWrapper= document.getElementById("subcontent-wrapper")

let words = []


function takeWords() {
     const highlightableWords = document.querySelectorAll(".highlightable")
    
     highlightableWords.forEach((element) =>{
        /* TODO: here you have to clean better the words deleting point, points and commas, parentesis etc. */
            let contetToClean = element.textContent.replaceAll(",", "")
            words.push(contetToClean)
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



let isOpenShowMore = false
let isHiddenShowMore = false

function activeShowMoreAnim(){
  try {
    /* this function is the beginning of the creation of Big Stats Interface. When the Show More Button is pressed, this is 
    the fist function called; it does nothing but enabling event listeners */

    /* clicking on the button Show More makes the animation start */
    showMoreButton.addEventListener("dblclick", animate)

    showMoreButton.addEventListener("dblclick", showAgain)

    /* at the end of animation, generates Big Stats Interface */
    showMoreButton.addEventListener("animationend", createBgStats)
  } catch (error) {
    console.log("error in BigStats creation", error)
  }
}

/* this f manages the animation of show more button */
function animate(){
    if (isOpenShowMore == false){
        isOpenShowMore = true
        showMoreButton.classList.add("animate")
    }
}


function populateBgStats(wordsOccCounter,lemmaOccCounter, mainCounter){
    /* this f deals with creating the HTML element on Bg Stats Interface */

  
     const wordsOcc = document.createElement("div")
     wordsOcc.classList.add("d-flex", "align-items-start", "justify-content-top", "flex-column", "box-word-big")
     wordsOcc.textContent = "Occorrenze parole declinate"
     
     const wordsOccContent = document.createElement("ul")
     wordsOccContent.classList.add("words-occ-content")
     wordsOcc.appendChild(wordsOccContent)

     showMoreWrapperContentWrapper.appendChild(wordsOcc)


    const lemmaOcc = document.createElement("div")
    lemmaOcc.classList.add("d-flex", "align-items-start", "justify-content-top","flex-column","box-word-big")
    lemmaOcc.textContent = "Occorrenze lemmi"

    const lemmaOccContent = document.createElement("ul")
    lemmaOccContent.classList.add("words-occ-content")
    lemmaOcc.appendChild(lemmaOccContent)

    showMoreWrapperContentWrapper.appendChild(lemmaOcc)
     
    /* appending words occ */
    for (const [word, freq] of Object.entries(wordsOccCounter)) {
        const bulletPoint = document.createElement('li');
        bulletPoint.textContent = `${word}: ${freq}`;
        wordsOccContent.appendChild(bulletPoint);
    }

    /* appending lemmas occ */
    for (const [word, freq] of Object.entries(lemmaOccCounter)) {
        const bulletPoint = document.createElement('li');
        bulletPoint.textContent = `${word}: ${freq}`;
        lemmaOccContent.appendChild(bulletPoint);
    }

     
     function createGeneralElement(type, text = "", position) {
      if (type == "div"){
        const div = document.createElement("div")
        
        div.textContent = text
        
      }}


}







function  createBgStats() {
   /* this function is the core of Bg Stats. It:
   1) generates and mananges the button "hide" and "close" on Bg Stats Interface 
   2) calculates Main Counter
   3) invokes populateBigStas function in order to create the HTML in Bg Stats Interface
   
   It deals with calculating the stats */
    
    if(isHiddenShowMore == false){

        /* button hide */
        const hideShowMoreButton = document.createElement("button")
        hideShowMoreButton.textContent = "Nascondi"
        hideShowMoreButton.className = "button-beige mt-4"
        showMoreWrapperButtonWrapper.appendChild(hideShowMoreButton)
        hideShowMoreButton.addEventListener("click", hideBgStatsInterface)
        
        
        /* button close */
      /*   const delShowMoreButton = document.createElement("button")
        delShowMoreButton.textContent = "Chiudi"
        delShowMoreButton.className = "button-beige mt-4"
        showMoreWrapperButtonWrapper.appendChild(delShowMoreButton)
        delShowMoreButton.addEventListener("click", delBgStatsInterface) */
      
      
        takeWords()

        console.log("words", words)
        console.log("SortedArr from stats.js", sortedArr)
        console.log("testo", inputGtx.value)

        let wordsOccCounter = {}

        for (const element of words) {
            if (!(element in wordsOccCounter) ) {
                wordsOccCounter[element] = 1}
            else {
                wordsOccCounter[element] ++
            }
        }


        let lemmaOccCounter = {}

        for (const element of sortedArr){
            if (!(element["SubVoce"] in lemmaOccCounter)){
                lemmaOccCounter[element["SubVoce"]] = 1
            }else{
                lemmaOccCounter[element["SubVoce"]]++
            }
        }

        let mainCounter = {}

        /* this loop calculates all the elements present in the text and their specs (for example how many verbs are there, how many aorist...)
        and populates the mainCounter object */
        sortedArr.forEach(element => {
          let category = element["category"]
          
          if (!(category in mainCounter)){
            /* = [n, {}, []] stands for number of the categories found, specs about that category, which are words of that category  */
            mainCounter[category] = [1, {}, []]
            mainCounter[category][2].push(element["word"])


            if (category == "verb") {
              /* = [n, []] stands for number of that specific spec founded, which are words belonging to that spec  (eg aorist: 3, [verb1, verb2...]) */
             mainCounter[category][1][element["tense"]] = [1, []]
             mainCounter[category][1][element["tense"]][1].push(element["word"])
             mainCounter[category][1][element["mood"]] = [1, []]  
             mainCounter[category][1][element["mood"]][1].push(element["word"])
            }
            else if(category == "noun"){
             mainCounter[category][1][element["case"]] = [1, []]
             mainCounter[category][1][element["case"]][1].push(element["word"])
             mainCounter[category][1][element["decl"]] = [1, []]
             mainCounter[category][1][element["decl"]][1].push(element["word"])
             mainCounter[category][1][element["gend"]] = [1, []] 
             mainCounter[category][1][element["gend"]][1].push(element["word"]) 
             mainCounter[category][1][element["number"]] = [1, []]  
             mainCounter[category][1][element["number"]][1].push(element["word"]) 

            }else if(category == "adjective"){
             mainCounter[category][1][element["case"]] = 1
             mainCounter[category][1][element["decl"]] = 1  
             mainCounter[category][1][element["gend"]] = 1  
             mainCounter[category][1][element["number"]] = 1
            }else if(category == "adverb"){
            /* adverbs haven't properties */
            }else if(category == "article"){
               /* decided to not count articles' case, gender... */
            }else if(category == "particle"){
             /* particle hanven't properties */
            }else if(category == "preposition"){
              /* prepositions haven't properties */
            }


          }else{
            mainCounter[category][0]++ 
            
            if (category == "verb") {
              mainCounter[category][2].push(element["word"])
              if (!(mainCounter[category][1][element["tense"]])) {
                  mainCounter[category][1][element["tense"]] = [1, []]
                  mainCounter[category][1][element["tense"]][1].push(element["word"]) 
              }else{
                  mainCounter[category][1][element["tense"]][0]++
                  mainCounter[category][1][element["tense"]][1].push(element["word"]) 
              }
              if (!(mainCounter[category][1][element["mood"]])){
                  mainCounter[category][1][element["mood"]] = [1, []]
                  mainCounter[category][1][element["mood"]][1].push(element["word"]) 
              }else{
                  mainCounter[category][1][element["mood"]][0]++
                  mainCounter[category][1][element["mood"]][1].push(element["word"]) 
              }

             }else if (category == "noun"){
              mainCounter[category][2].push(element["word"])
              if (!(mainCounter[category][1][element["case"]])){
                mainCounter[category][1][element["case"]] = [1, []] 
                mainCounter[category][1][element["case"]][1].push(element["word"])
                
              }else{
                mainCounter[category][1][element["case"]][0]++
                mainCounter[category][1][element["case"]][1].push(element["word"])
              }
              if (!(mainCounter[category][1][element["gend"]])){
                mainCounter[category][1][element["gend"]] = [1, []] 
                mainCounter[category][1][element["gend"]][1].push(element["word"])

              }else{
                mainCounter[category][1][element["gend"]][0]++
                mainCounter[category][1][element["gend"]][1].push(element["word"])
              }
              if (!(mainCounter[category][1][element["number"]])){
                mainCounter[category][1][element["number"]] = [1, []] 
                mainCounter[category][1][element["number"]][1].push(element["word"])

              }else{
                mainCounter[category][1][element["number"]][0]++
                mainCounter[category][1][element["number"]][1].push(element["word"])
              }
              if (!(mainCounter[category][1][element["decl"]])){
                mainCounter[category][1][element["decl"]] = [1, []] 
                mainCounter[category][1][element["decl"]][1].push(element["word"])

              }else{
                mainCounter[category][1][element["decl"]][0]++
                mainCounter[category][1][element["decl"]][1].push(element["word"])
              }
            }else if(category == "adjective"){
              mainCounter[category][2].push(element["word"])
              !(mainCounter[category][1][element["case"]])? mainCounter[category][1][element["case"]] = 1 : mainCounter[category][1][element["case"]]++ 
              !(mainCounter[category][1][element["gend"]])? mainCounter[category][1][element["gend"]] = 1 : mainCounter[category][1][element["gend"]]++ 
              !(mainCounter[category][1][element["number"]])? mainCounter[category][1][element["number"]] = 1 : mainCounter[category][1][element["number"]]++ 
              !(mainCounter[category][1][element["decl"]])? mainCounter[category][1][element["decl"]] = 1 : mainCounter[category][1][element["decl"]]++ 
            }else if(category == "adverb"){
              /* adverbs haven't properties */
            }else if(category == "article"){
              /* decided to not count articles' case, gender... */
            }else if(category == "particle"){
              /* particles hanven't properties */
            }else if(category == "preposition"){
              /* prepositions haven't properties */
            }
          }});

        console.log(mainCounter)

        populateBgStats(wordsOccCounter,lemmaOccCounter, mainCounter)


       
    }


    
}


function hideBgStatsInterface(){
    showMoreWrapper.classList.add("hide")
    showMoreButton.classList.remove("animate")
    isHiddenShowMore = true
    showMoreButton.insertAdjacentHTML("afterbegin", "<span> nascosto</span>")

     const span = showMoreButton.querySelector('span.mt-4');
if (span) {
    span.remove();}
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
    showMoreWrapperBarWrapper.innerHTML = ""
    showMoreWrapperButtonWrapper.innerHTML = ""
    console.log(showMoreButton)
    isOpenShowMore = false
    isHiddenShowMore = false 
}





export { genSmStats, activeShowMoreAnim }