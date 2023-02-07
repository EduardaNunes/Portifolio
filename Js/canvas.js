var play = document.querySelector('.btn-play')

play.addEventListener('click',mainShow)

function mainShow(){
    var firstScreen = document.querySelectorAll('nav, header, main')
    
    for (var i = 0; i < firstScreen.length; i++)
    firstScreen[i].classList.toggle('hide')
}

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

