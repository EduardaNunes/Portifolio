const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

const playerImg = new Image()
playerImg.src = '../Imgs/PlayerImg.png'

const platformImg = new Image()
platformImg.src = '../Imgs/PlatformImg.png'

const teste = new Image()
teste.src = '../Imgs/tileset_a.png'

class Player {
    constructor(){

        this.position = {
            x:500,
            y:100
        }

        this.velocity = {
            x: 0,
            y: 25
        }

        this.image = playerImg
        this.width = 100
        this.height = 100
        this.jump = 0
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
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
    constructor({x, y, w , h}){
        this.position = {x, y}

        this.image = teste
        this.width = w
        this.height = h
    }

    draw(){
        c.drawImage(this.image, 0, 0, 800, 3200, this.position.x, this.position.y - 100, 100, 400)
        c.drawImage(this.image, 800, 0, 800, 3200, this.position.x+100, this.position.y - 100, 100, 400)
        c.drawImage(this.image, 800, 0, 800, 3200, this.position.x+200, this.position.y - 100, 100, 400)
        c.drawImage(this.image, 800, 0, 800, 3200, this.position.x+300, this.position.y - 100, 100, 400)
        c.drawImage(this.image, 800, 0, 800, 3200, this.position.x+400, this.position.y - 100, 100, 400)
        c.drawImage(this.image, 1600, 0, 800, 3200, this.position.x+500, this.position.y - 100, 100, 400)
    }
}

const player = new Player()

const platforms = [

    new Platform({
        x:0, 
        y:650, 
        w:600, 
        h:100
    }), 
    new Platform({
        x:1000, 
        y:650, 
        w:600, 
        h:100
    }),
    new Platform({
        x:2000, 
        y:650, 
        w:600, 
        h:100
    }),
    new Platform({
        x:3000, 
        y:650, 
        w:600, 
        h:100
    }),   

    ]

const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    up: {
        pressed: false
    },
    speed: {
        bonus: 1
    }
}

let mapScroll = 0

// Essa função limpa o canvas para que não fique uma linha desenhada por onde o player passou visto que ele é redesenhado a cada update()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platforms.forEach( (platform) => {
        platform.draw()
    })
    player.update()

    // Movimentação lateral do Player quando a tecla estiver pressionada e parando quando a mesma não está mais pressionada

    if(keys.left.pressed == true && player.position.x >= canvas.width/5 ){
        player.velocity.x = -7 *  keys.speed.bonus

    }else if(keys.right.pressed == true && player.position.x <= canvas.width/2){
        player.velocity.x = 7 *  keys.speed.bonus

    }else{
        player.velocity.x *= 0.5

        if (keys.left.pressed == true) {

            platforms.forEach((platform) => {
                mapScroll += 7 * keys.speed.bonus
                platform.position.x += 7 * keys.speed.bonus
            })

        }else if (keys.right.pressed == true) {

            platforms.forEach((platform) => {
                mapScroll -= 7 * keys.speed.bonus
                platform.position.x -= 7 * keys.speed.bonus
            })
        }
    }

    // Permitindo apenas 1 Pulo por vez que é resetado quando encostado no chão ou em uma plataforma

    if(keys.up.pressed == true && player.jump == 0){
        player.velocity.y -= 22
        player.jump = 1
    }

    // Colizão com as plataformas de cima para baixo

    platforms.forEach((platform) =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
            player.jump = 0
        }
    })

}

animate()

// Com esses Event Listeners de Keydown e Keyup nós verificamos as teclas de movimentação do player

window.addEventListener('keydown', ({keyCode}) => {
    
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

        // SPEED (SHIFT)
        case 16:
            keys.speed.bonus = 2
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

        // SPEED (SHIFT)
        case 16:
            keys.speed.bonus = 1
            break
    }
})