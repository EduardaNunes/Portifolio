export default class Platform {
    constructor(x, y, w , h, image){

        this.position = {x, y}

        this.width = w
        this.height = h

        this.image = image;
        this.buffer = this.buffer()
    }

    buffer(){
        const platformCanvas = document.createElement('canvas') 
        const platformContext = platformCanvas.getContext('2d')

        platformCanvas.width = this.width
        platformCanvas.height = this.height

        platformContext.drawImage(this.image, 0, 800, 800, 2400, 0,0, 100, 300)

        for (let i = 1; i < (this.width/100) -1; i++){
            platformContext.drawImage(this.image, 800, 800, 800, 800, i * 100,0, 100, 100)
            platformContext.drawImage(this.image, 800, 2400, 800, 800, i * 100,200, 100, 100)

            if (i%2 == 0){
                platformContext.drawImage(this.image, 800, 1600, 800, 800, i * 100,100, 100, 100)
            }
        }

        platformContext.drawImage(this.image, 1600, 800, 800, 2400, this.width - 100,0, 100, 300)

        return platformCanvas
    }

    draw(levelContext){
        levelContext.drawImage(this.buffer, this.position.x, this.position.y, this.width, this.height)
    }
}