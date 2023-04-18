const cloudsSection = document.querySelector('.clouds')

    for (var i = 0; i < 20; i++){

        let cloudCreate = document.createElement('img');
        cloudCreate.classList.add('cloud');
        cloudsSection.appendChild(cloudCreate)
    
        let randomAnimation = Math.floor(Math.random()*20)+ 40;
        let randomPosition = Math.floor(Math.random()*101);
        let cloud = document.querySelectorAll('.cloud');
    
        cloud[i].style.top = ((100/20)*i) + 'vh';
        cloud[i].style.left = randomPosition + 'vw';
        cloud[i].style.animation = 'across ' + randomAnimation + 's linear infinite';
    }

    setInterval(comparePosition, 500);


function comparePosition(){

    let cloud = document.querySelectorAll('.cloud');

    for (var i = 0; i < 12; i++){

        let position = cloud[i].getBoundingClientRect();

        if (position.right >= window.innerWidth + cloud[i].offsetWidth || position.right >= document.documentElement.clientWidth + cloud[i].offsetWidth){

            let randomAnimation = Math.floor(Math.random()*20)+ 40;

            cloud[i].style.animation = 'none';
            cloud[i].offsetHeight; /* trigger reflow */
            cloud[i].style.animation = 'across ' + randomAnimation + 's linear infinite';
        }
    }
}
