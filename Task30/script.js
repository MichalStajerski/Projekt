let dragindex=0
let dropindex=0
let clone=""
const answer = 'Ala ma czarnego kota'
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
    document.getElementById('parent').replaceChild(document.getElementById(data),e.target)
    document.getElementById('parent').insertBefore(clone,document.getElementById('parent').childNodes[dragindex])
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

function createLayout(array,event){
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
window.onload = function(){
    createLayout(words)
    drawOrderOfWords()
    insertWordIntoDiv(order)
}