import {loadImage, loadLevel} from './loader.js'
import Player from './player.js'
import Level from './level.js'
import Platform from './platforms.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const levelCanvas = document.createElement('canvas')
const levelContext = levelCanvas.getContext('2d')

levelCanvas.height = canvas.height
levelCanvas.width = 5000

const gravity = 0.5
let mapScroll = 0
const platforms = []

function createPlatforms(levelInfos, tileset){

    for(let i = 0; i < levelInfos.platforms.length; i++){

        levelInfos.platforms[i].range.forEach(([x,y,w,h]) => {

             const newPlatform = new Platform(x, y, w, h, tileset)
             newPlatform.draw(levelContext)
             platforms.push(newPlatform)

        })
    }
}

// Com a promise nós iremos carregar as imagens do player e do mundo assim como o json responsável
// pelas configurações do mundo (localização das plataformas) e só depois de tudo carregado iremos 
// poder criar o player e o lvl no canvas assim como executar as funções

Promise.all([
    loadImage('../Imgs/PlayerImg.png'),
    loadImage('../Imgs/tileset_a.png'),
    loadLevel('level')
])
.then(([playerSprite, tileset, levelInfos]) => {

    const player = new Player(playerSprite) 
    const level = new Level(0,0,levelCanvas.width, canvas.height, levelCanvas)

    createPlatforms(levelInfos, tileset)

 // Essa função limpa o canvas para que não fique uma linha desenhada por onde o player passou visto que ele é redesenhado a cada update()

    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        level.draw(c)
        player.update(canvas, c, gravity)
    
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

                level.position.x += 7 * keys.speed.bonus

            }else if (keys.right.pressed == true) {
    
                platforms.forEach((platform) => {
                    mapScroll -= 7 * keys.speed.bonus
                    platform.position.x -= 7 * keys.speed.bonus
                })

                level.position.x -= 7 * keys.speed.bonus
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

        //Reset ao cair

        if(player.position.y + player.height >= canvas.height){
            document.location.reload()
        }
    
    }

    animate()
})

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