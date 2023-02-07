var cloudsSection = document.querySelector('.clouds')

for (var i = 0; i < 25; i++){
    cloudsSection.innerHTML+='<div class="cloud cloud'+[i]+'"></div>';
    var cloud = document.querySelectorAll('.cloud');

        while (i<5){
            cloud[i].style.top += (-5) + 'vh';
            cloud[i].style.left += (i * 20+2) + 'vw';
            break;
        }

        while (i>=5 && i<10){
            cloud[i].style.top += (20) + 'vh';
            cloud[i].style.left += ((i-5) * 20+15) + 'vw';
            break
        }

        while (i>=10 && i<15){
            cloud[i].style.top += (45) + 'vh';
            cloud[i].style.left += ((i-10) * 20+2) + 'vw';
            break
        }

        while (i>=15 && i<20){
            cloud[i].style.top += (70) + 'vh';
            cloud[i].style.left += ((i-15) * 20+15) + 'vw';
            break
        }

        while (i>=20 && i<25){
            cloud[i].style.top += (95) + 'vh';
            cloud[i].style.left += ((i-20) * 20+2) + 'vw';
            break
        }

}
