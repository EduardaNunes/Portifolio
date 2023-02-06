var btn_light_Dark = document.querySelector('.btn-light-dark');

btn_light_Dark.addEventListener('click',lightMode);

function lightMode(){
    var light = document.querySelector('.light') 
    var dark = document.querySelector('.dark')

    document.body.classList.toggle('lightmode')
    light.classList.toggle('hide')
    dark.classList.toggle('hide')
}