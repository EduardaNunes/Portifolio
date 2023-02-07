var btn_lang = document.querySelector('.btn-language')

btn_lang.addEventListener('click',languageSwitch)

function languageSwitch(){

    var languages = document.querySelectorAll('.language-pt, .language-eng')

    for (var i = 0; i < languages.length; i++){
    languages[i].classList.toggle('hide')
    }
}