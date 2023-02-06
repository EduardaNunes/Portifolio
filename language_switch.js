var btn_lang = document.querySelector('.btn-language')

btn_lang.addEventListener('click',languageSwitch)

function languageSwitch(){

    var lang_pt = document.querySelectorAll('.language-pt')
    var lang_eng = document.querySelectorAll('.language-eng')
    var i = 0;

    while (i < lang_pt.length && i < lang_eng.length){
    lang_pt[i].classList.toggle('hide')
    lang_eng[i].classList.toggle('hide')
    i++
    }
}