var btn_light_Dark = document.querySelector('.btn-light-dark');

btn_light_Dark.addEventListener('click',lightMode);

function lightMode(){
    var lightDark = document.querySelectorAll('.light, .dark') 

    document.body.classList.toggle('lightmode')

    for (var i = 0; i < lightDark.length; i++)
    lightDark[i].classList.toggle('hide')
}