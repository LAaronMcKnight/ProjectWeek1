const waypoints = [
    {
        "x":-83,
        "y":51
    }, 
    {
        "x":341,
        "y":52
    }, 
    {
        "x":341,
        "y":160
    }, 
    {
        "x":113,
        "y":160
    }, 
    {
        "x":113,
        "y":258
    }, 
    {
        "x":461,
        "y":257
    }, 
    {
        "x":461,
        "y":100
    }, 
    {
        "x":823,
        "y":101
    }, 
    {
        "x":824,
        "y":258
    }, 
    {
        "x":582,
        "y":259
    }, 
    {
        "x":582,
        "y":401
    }, 
    {
        "x":116,
        "y":402
    }, 
    {
        "x":115,
        "y":628
    }, 
    {
        "x":1090,
        "y":627
    }]

// --------End waypoint map ---------//


//----Start-----// Enemy class dimensions, center, and spawn / update functions, && Array 

const enemies = []

class Enemy {
    constructor({ position = { x: 0, y: 0}}){
        this.position = position
        this.width = 30
        this.height = 30
        this.radius = 15
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.health = 100
        this.speed = 1.5
        this.velocity = {
            x:0, y:0
        }
    } // end constructor
    
    spawn() {
        cvs.fillStyle = 'goldenrod'
        // cvs.fillRect(this.position.x, this.position.y, this.width, this.height)

        cvs.beginPath()
        cvs.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        cvs.fill()

        cvs.fillStyle = 'red'
        cvs.fillRect(this.position.x, this.position.y - 8, this.width, 5)

        cvs.fillStyle = 'green'
        cvs.fillRect(this.position.x, this.position.y - 8, this.width * this.health / 100, 5)
    }

    update() {
        this.spawn()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)
        this.position.x += this.velocity.x * this.speed
        this.position.y += this.velocity.y * this.speed
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        
        if (Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x * this.speed) && Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y * this.speed) && this.waypointIndex < waypoints.length -1 ){
            this.waypointIndex++
        }
    }
}

//-----END-----// Enemy class dimensions, center, and spawn / update functions, && Array

function spawnWave(num, gap) {
    for (let i = 1; i <= num; i++) {
        waveGap = i * gap
        enemies.push(new Enemy({ position: {x: waypoints[0].x - waveGap, y: waypoints[0].y} }))
    }
}

// function endlessMode() {
//     let num = 10
//     let gap = 100

//     // while (player.health < 0){
//         spawnWave(num, gap)
        
//         if (enemies.length === 0){
//             num += 10
//             gap -= 5
//             spawnWave(num, gap)
//         }
//     }


// endlessMode()


spawnWave(30, 100)