const images = ['Imgs/CloudBlack.png', 'Imgs/ProfileBlack.png', 'Imgs/SwitchBlack.png', 'Imgs/CloudWhite.png', 'Imgs/ProfileWhite.png', 'Imgs/SwitchWhite.png'];

images.forEach((imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
});

function lightMode(){
    var light = document.querySelectorAll('.light') 
    var dark = document.querySelectorAll('.dark')

    document.body.classList.toggle('lightmode')

    for (i=0;i<light.length;i++){
        light[i].classList.toggle('hide')
        dark[i].classList.toggle('hide')     
    }
}


window.addEventListener('load', () => {

    var mousePosition;
    var offset = [0,0];
    var light_Dark_Switch = document.querySelector('.light-dark-switch');
    var isDown = false;
    var position;

    light_Dark_Switch.addEventListener('mousedown', function(e) {

        isDown = true;

        offset = [
            light_Dark_Switch.offsetLeft - e.clientX,
            light_Dark_Switch.offsetTop - e.clientY
        ];

    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;

        if(position.top > -20 && position.top < -1 ){
            lightMode();
            var audioSwitch = new Audio('Sounds/Light-Switch.mp3');
            audioSwitch.play();
            document.body.style.cursor='';
            light_Dark_Switch.style.top  = '-50px';
        }else{
            light_Dark_Switch.style.top  = '-50px';
        }

    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        position = light_Dark_Switch.getBoundingClientRect();

        if (isDown) {

            mousePosition = {
        
                x : event.clientX,
                y : event.clientY
        
            };

            document.body.style.cursor='grabbing';

            if(position.top < -20){
                light_Dark_Switch.style.top  = (mousePosition.y + offset[1]) + 'px';
            }

        }
    }, true);
});