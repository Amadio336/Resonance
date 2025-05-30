import { sortedArr } from "./APIs.js"

const buttonAutomaticResearch = document.getElementById("automatic-research")


let colorIndex = 0

const SubVoceOnlyArr = [] /* this array has only the SubVoce values of the words analyzed */


let index = 0


function prova() {
    const words = document.querySelectorAll(".highlightable")

    sortedArr.forEach(element => {
        SubVoceOnlyArr.push(element.SubVoce)
    })

    console.log(SubVoceOnlyArr)

    SubVoceOnlyArr.forEach(element => {
        let n = SubVoceOnlyArr.indexOf(element, index)



        for (let i = 1; i < 15; i++) {

/*             console.log("n", n, "    ", "n+i", n + i) */

            if (element == SubVoceOnlyArr[n + i]) {
                console.log("giusto")

                const colours = ['green', 'blue', 'yellow', 'purple'];

                words[n].style.backgroundColor = colours[colorIndex]
                words[n + i].style.backgroundColor = colours[colorIndex]
                colorIndex++





            }

            index = n + 1
        }

    })


}










export { buttonAutomaticResearch, prova }