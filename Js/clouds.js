const cloudsSection = document.querySelector('.clouds')

for (var i = 0; i < 12; i++){
    let cloudCreate = document.createElement('img');
    cloudCreate.classList.add('cloud');
    cloudsSection.appendChild(cloudCreate)

    var cloud = document.querySelectorAll('.cloud');
    var randomAnimation = Math.floor(Math.random()*10)+ 25;
    var randomPosition = Math.floor(Math.random()*101);

    cloud[i].style.top = (8.3*i) + 'vh';
    cloud[i].style.left = randomPosition + 'vw';
    cloud[i].style.animation = 'across ' + randomAnimation + 's linear infinite';
}
