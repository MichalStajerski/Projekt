let dragindex=0
let dropindex=0
let clone=""
const answer = 'Dzis jest bardzo pochmurny dzien'
const words = answer.split(' ')
let order = []
console.log('words',words)

function drag(e){
    e.dataTransfer.setData('text',e.target.id)
}

function drop(e){
    e.preventDefault()
    clone=e.target.cloneNode(true)
    let data=e.dataTransfer.getData('text');
    let nodelist=document.getElementById('parent').childNodes
    for(let i=0;i<nodelist.length;i++){
        if(nodelist[i].id==data){
            dragindex=i
        }
    }
    if(document.getElementById(data)!==e.target){
        document.getElementById('parent').replaceChild(document.getElementById(data),e.target)
        document.getElementById('parent').insertBefore(clone,document.getElementById('parent').childNodes[dragindex])
        findElementID()
    }
}

function allowDrop(e){
    e.preventDefault()
}

function drawOrderOfWords(){
    for(let i = 0;i<words.length;i++){
        order.push(i)
    }
    console.log(order)
    shuffleArray(order)
    console.log(order)
}

function insertWordIntoDiv(array){
    for(let i = 0; i < array.length;i++){
        document.getElementById('word'+i).innerHTML = words[array[i]]
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createLayout(array){
    // const numWords = array.length
    const container = document.getElementById('parent')
    for(let i = 0;i<array.length;i++){
        const word = document.createElement('div')
        word.id='word'+i
        word.className = 'droptarget'
        word.draggable= 'true' 
        word.setAttribute("ondragstart","drag(event)")
        word.setAttribute("ondrop","drop(event)")
        word.setAttribute("ondrAGOVER","allowDrop(event)") 
        container.appendChild(word)
    }
}

function checkAnswer(divIdsOrder){
    let joinedWords = ''
    for(let i = 0 ; i<divIdsOrder.length;i++){
        joinedWords += ' '+document.getElementById(divIdsOrder[i]).innerHTML 
    }
    joinedWords = joinedWords.trim()
    if(joinedWords === answer){
        setTimeout(()=>{
            alert("Correct")
        },100)
    }
    divIdsOrder = []
}

function findElementID() {
    let wordOrder = document.getElementById('parent').children
    let divIdsOrder = []
    
    // Loop through all the child elements inside the parent DIV.
    for (i = 0; i <= wordOrder.length - 1; i++) {
        divIdsOrder.push(wordOrder[i].id)
    }
    console.log(divIdsOrder)
    checkAnswer(divIdsOrder)
}

window.onload = function(){
    createLayout(words)
    drawOrderOfWords()
    insertWordIntoDiv(order)
    
}