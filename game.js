const canvas = document.querySelector('canvas')
const cvs = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 780

const image = new Image()
image.onload = ()=>{
    animate();
}
image.src = '/images/map1.png'

class Enemy {
    constructor({ position = { x: 0, y: 0}}){
        this.position = position
        this.width = 30
        this.height = 30
        this.waypointIndex = 0
    }
    
    spawn() {
        cvs.fillStyle = 'goldenrod'
        cvs.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.spawn()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.position.y
        const xDistance = waypoint.x - this.position.x
        const angle = Math.atan2(yDistance, xDistance)
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        
        if (Math.round(this.position.x) === Math.round(waypoint.x) && Math.round(this.position.y) === Math.round(waypoint.y) && this.waypointIndex < waypoints.length -1 ){
            this.waypointIndex++
        }
    }
}
const enemy1 = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } })


function animate() {
    requestAnimationFrame(animate)
    cvs.drawImage(image, 0, 0)
    console.log('animate')
    enemy1.update()
    
}


