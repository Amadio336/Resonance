import { colorIndex } from "./automatic-research.js";


const colours = [
 
];



function generateColours() {
    console.log("generatecolours")
    for (let index = 0; index < 500; index++) {
        
        const red = Math.round(Math.random() * ((255-1)+1))
        
        const green = Math.round(Math.random() * ((255-1)+1))

        const blue = Math.round(Math.random() * ((255-1)+1))

        const colourRGBA = `rgba(${red}, ${green}, ${blue}, 1)`
        colours.push(colourRGBA)
    }
    
}


/* rgba(255, 0, 0, 1) */




export { colours, generateColours }