//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// Draw canvas && Map, Call animation loop
const canvas = document.querySelector('canvas')
const cvs = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 780

const image = new Image()
image.src = '/images/map2.png'
// image.onload = ()=>{
//     animate();
// }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



// Animate -> request frame loop // ************************************   *  *  * *

function animate() {
    const animationId = requestAnimationFrame(animate)

    cvs.drawImage(image, 0, 0)
    
    for (let i = enemies.length - 1; i >= 0; i--){
        const enemy = enemies[i]
        enemy.update()

        if (enemy.position.x > canvas.width) {
            console.log('decrease life')
            Player.health--
            enemies.splice(i, 1)
            document.getElementById('healthNum').innerHTML = Player.health

            if (Player.health === 0){
                cancelAnimationFrame(animationId)
                gameOver()
            }
        }
    }
    
    buildTiles.forEach(tile =>{
        tile.update(mouse)
    })

    towers.forEach(tower =>{
        tower.update()
        this.target = undefined
        const validEnemies = enemies.filter(enemy =>{
            const xDistance = enemy.center.x - tower.center.x
            const yDistance = enemy.center.y - tower.center.y
            const distance = Math.hypot(xDistance, yDistance)
            return distance < enemy.radius + tower.range
        })
        tower.target = validEnemies[0]
        
        for (let i = tower.projectiles.length - 1; i >= 0; i--){
            const projectile = tower.projectiles[i]
        
            projectile.update()

            const xDistance = projectile.enemy.center.x - projectile.position.x
            const yDistance = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDistance, yDistance)
            if (distance < projectile.enemy.radius + projectile.radius){
                projectile.enemy.health -= 20
                if ( projectile.enemy.health <= 0){
                    const enemyIndex = enemies.findIndex(enemy =>{
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1) { 
                        enemies.splice(enemyIndex, 1)
                        Player.score += 10
                        Player.money += 10
                        document.getElementById('scoreNum').innerHTML = Player.score
                        document.getElementById('moneyNum').innerHTML = Player.money
                    } // if > -1 to in case enemy is destroyed by another tower before projectile hit
                }

                tower.projectiles.splice (i, 1)
            }
        }
    })
    
}

// ---------------------------- // ************************************    *   *  * *

function gameOver(){
    let el = document.createElement('div')
    el.classList.add('gameOverText')
    el.innerText = "GAME OVER"
    document.body.appendChild(el)

    // gameOverText.style.display = 'flex'
}



// V----------------HTML interactions--------------V //


let gridButton = document.getElementById('gridButton')
let grid = document.getElementById('grid')
let clicks = 0
gridButton.addEventListener('click', e=>{

    if (clicks % 2 === 0){
        grid.style.display = 'flex'
        gridButton.innerHTML = 'Hide Grid'
        clicks++
    }else{
        grid.style.display = 'none'
        gridButton.innerHTML = 'Show Grid'
        clicks++
    }
})

// ------- // 

getNameInput = ()=>{
    let username = document.getElementById('gameName').value
    let bannerContent = document.querySelector('.bannerContent')
    let banner = document.querySelector('.banner')
    let inputField = document.querySelector('.input')

    
    inputField.style.display = 'none'
    banner.style.display = 'flex'
    bannerContent.append(username)
    animate()
    

}

