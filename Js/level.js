export default class Level {
    constructor (x, y, w, h, levelCanvas){

        this.position = {x,y}

        this.width = w
        this.height = h

        this.canvas = levelCanvas
    }

    draw(c){
        c.drawImage(this.canvas, this.position.x, this.position.y, this.width, this.height)
    }
}