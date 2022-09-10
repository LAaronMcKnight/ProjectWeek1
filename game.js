//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// Draw canvas && Map, Call animation loop
const canvas = document.querySelector('canvas')
const cvs = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 780

const image = new Image()
image.onload = ()=>{
    animate();
}
image.src = '/images/map2.png'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//




//----Start-----// Enemy class dimensions, center, and spawn / update functions, && Array 

class Enemy {
    constructor({ position = { x: 0, y: 0}}){
        this.position = position
        this.width = 30
        this.height = 30
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }
    
    spawn() {
        cvs.fillStyle = 'goldenrod'
        cvs.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.spawn()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        
        if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex < waypoints.length -1 ){
            this.waypointIndex++
        }
    }
}




//-----END-----// Enemy class dimensions, center, and spawn / update functions, && Array



// Animate -> request frame loop //

function animate() {
    requestAnimationFrame(animate)

    cvs.drawImage(image, 0, 0)
    
    enemies.forEach(enemy => {
        enemy.update()
    })
    buildTiles.forEach(tile =>{
        tile.update(mouse)
    })
    
}

//------------------------------// 

