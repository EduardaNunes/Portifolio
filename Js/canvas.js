const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
    constructor(){

        this.position = {
            x:100,
            y:100
        }

        this.velocity = {
            x: 0,
            y: 25
        }

        this.width = 100
        this.height = 100
        this.jump = 0
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {

        // Aqui desenha o personagem a cada atuação de acordo com os modificadores de posição

        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        // Atuação da gravidade em cima do player caso ele ainda não tenha tocado o chão

        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
            this.jump = 0
        }
    }
}

class Platform {
    constructor(){
        this.position = {
            x: 600,
            y: 600
        }

        this.width = 400
        this.height = 40
    }

    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

// Essa função limpa o canvas para que não fique uma linha desenhada por onde o player passou visto que ele é redesenhado a cada update()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platform.draw()
    player.update()

    // Movimentação lateral do Player quando a tecla estiver pressionada e parando quando a mesma não está mais pressionada

    if(keys.left.pressed == true){
        player.velocity.x = -7
    }else if(keys.right.pressed == true){
        player.velocity.x = 7
    }else{
        player.velocity.x = 0
    }

    // Permitindo apenas 1 Pulo por vez que é resetado quando encostado no chão ou em uma plataforma

    if(keys.up.pressed == true && player.jump == 0){
        player.velocity.y -= 22
        player.jump = 1
    }

    // Colizão com as plataformas de cima para baixo

    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
        player.jump = 0
    }
}

animate()

// Com esses Event Listeners de Keydown e Keyup nós verificamos as teclas de movimentação do player

window.addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode)
    
    switch (keyCode){

        // LEFT (A) + (<- ARROW)
        case 65:
        case 37:
            keys.left.pressed = true
            break

        // RIGHT (D) + (-> ARROW)
        case 68:
        case 39:
            keys.right.pressed = true
            break

        // UP (W) + (SPACE) + (^ ARROW)
        case 87:
        case 32:
        case 38:
            keys.up.pressed = true
            break
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    
    switch (keyCode){

        // LEFT (A) + (<- ARROW)
        case 65:
        case 37:
            keys.left.pressed = false
            break

        // RIGHT (D) + (-> ARROW)
        case 68:
        case 39:
            keys.right.pressed = false
            break

        // UP (W) + (SPACE) + (^ ARROW)
        case 87:
        case 32:
        case 38:
            keys.up.pressed = false
            break
    }
})