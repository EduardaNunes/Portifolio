var btn_light_Dark = document.querySelector('.btn-light-dark');

btn_light_Dark.addEventListener('click',lightMode);

function lightMode(){
    var light = document.querySelectorAll('.light') 
    var dark = document.querySelectorAll('.dark')

    document.body.classList.toggle('lightmode')

    for (i=0;i<light.length;i++){
        light[i].classList.toggle('hide')
        dark[i].classList.toggle('hide')     
    }
}