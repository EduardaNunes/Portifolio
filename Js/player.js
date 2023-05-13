export default class Player {
    constructor(image){

        this.position = {
            x:300,
            y:100
        }

        this.velocity = {
            x: 0,
            y: 25
        }

        this.image = image;

        this.width = 100
        this.height = 100
        this.jump = 0
    }

    draw(c){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(canvas, c, gravity) {

        // Aqui desenha o personagem a cada atuação de acordo com os modificadores de posição

        this.draw(c)
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