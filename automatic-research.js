import { sortedArr } from "./APIs.js"

const buttonAutomaticResearch = document.getElementById("automatic-research")

const colours = [
    'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold',
    'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold',
    'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold',
    'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold',
    'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold', 'red', 'green', 'blue', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'white',
    'grey', 'cyan', 'magenta', 'lime', 'indigo',
    'violet', 'turquoise', 'beige', 'maroon', 'gold',
];



let colorIndex = 0

const SubVoceOnlyArr = [] /* this array has only the SubVoce values of the words analyzed */


let index = 0


function prova() {
    const words = document.querySelectorAll(".highlightable") /*  the elements in the text provided by user */

    sortedArr.forEach(element => {
        SubVoceOnlyArr.push(element.SubVoce)
    })



    SubVoceOnlyArr.forEach(element => {
        let n = SubVoceOnlyArr.indexOf(element, index) /* n is the index of element in the SubVoceOnlyArr */

        const RepMap = {}



        for (let i = 1; i < 20; i++) {
            /* 
                        console.log(SubVoceOnlyArr[n], "    ", SubVoceOnlyArr[n + i]) */

            if (element == SubVoceOnlyArr[n + i]) {  /* the logic is -> if an element is equal to a next element, make colored the repetitions */
                console.log("giusto")


                console.log("n", n, "     ", "n+i", n + i, SubVoceOnlyArr[n])

                words[n].setAttribute("data-repetition", SubVoceOnlyArr[n])
                words[n + i].setAttribute("data-repetition", SubVoceOnlyArr[n + i])


                RepMap.value = SubVoceOnlyArr[n]
                RepMap.colour = colours[colorIndex]




                words[n].classList.add("repetition")
                words[n + i].classList.add("repetition")


                
                
                
                
                
                
                /*       words[n].style.backgroundColor = colours[colorIndex]
                     words[n + i].style.backgroundColor = colours[colorIndex]  */
                     
                    }
                    index = n + 1
                    
                }
                
                const repetitions = document.querySelectorAll(".repetition")
                /*        console.log("repetition", repetitions) */
                
                repetitions.forEach(repetition => {
                    if (repetition.getAttribute("data-repetition") == RepMap.value) {
                        repetition.style.color = RepMap.colour
                        colorIndex++
                        
                    }
                    
                    
                })
                
                
                



    })
    
        console.log("colorIndex", colorIndex) 

}











export { buttonAutomaticResearch, prova }