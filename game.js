//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// Draw canvas
const canvas = document.querySelector('canvas')
const cvs = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 780

const image = new Image()
image.src = '/images/map2.png'

window.onload = ()=>{
    cvs.drawImage(image, 0, 0)
}

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
                storeScore()
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
    
    towers2.forEach(tower2 =>{
        tower2.update()
        this.target = undefined
        const validEnemies = enemies.filter(enemy =>{
            const xDistance = enemy.center.x - tower2.center.x
            const yDistance = enemy.center.y - tower2.center.y
            const distance = Math.hypot(xDistance, yDistance)
            return distance < enemy.radius + tower2.range
        })
        tower2.target = validEnemies[0]
        
        for (let i = tower2.projectiles.length - 1; i >= 0; i--){
            const projectile = tower2.projectiles[i]
        
            projectile.update()
    
            const xDistance = projectile.enemy.center.x - projectile.position.x
            const yDistance = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDistance, yDistance)
            if (distance < projectile.enemy.radius + projectile.radius){
                projectile.enemy.health -= 40
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
    
                tower2.projectiles.splice (i, 1)
            }
        }
    })

    // towers3.forEach(tower3 =>{
    //     tower3.update()
    //     this.target = undefined
    //     const validEnemies = enemies.filter(enemy =>{
    //         const xDistance = enemy.center.x - tower3.center.x
    //         const yDistance = enemy.center.y - tower3.center.y
    //         const distance = Math.hypot(xDistance, yDistance)
    //         return distance < enemy.radius + tower3.range
    //     })
    //     tower3.target = validEnemies[0]
        
    //     for (let i = tower3.projectiles.length - 1; i >= 0; i--){
    //         const projectile2 = tower3.projectiles2[i]
        
    //         projectile2.update()
    
    //         const xDistance = projectile2.enemy.center.x - projectile2.position.x
    //         const yDistance = projectile2.enemy.center.y - projectile2.position.y
    //         const distance = Math.hypot(xDistance, yDistance)
    //         if (distance < projectile2.enemy.radius + projectile2.radius){
    //             projectile2.enemy.health -= 40
    //             if ( projectile2.enemy.health <= 0){
    //                 const enemyIndex = enemies.findIndex(enemy =>{
    //                     return projectile2.enemy === enemy
    //                 })
    //                 if (enemyIndex > -1) { 
    //                     enemies.splice(enemyIndex, 1)
    //                     Player.score += 10
    //                     Player.money += 10
    //                     document.getElementById('scoreNum').innerHTML = Player.score
    //                     document.getElementById('moneyNum').innerHTML = Player.money
    //                 } // if > -1 to in case enemy is destroyed by another tower before projectile hit
    //             }
    
    //             tower2.projectiles.splice (i, 1)
    //         }
    //     }
    // })
}

// ---------------------------- // ************************************    *   *  * *



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

function getNameInput(){
    let username = document.getElementById('gameName').value
    let bannerContent = document.querySelector('.bannerContent')
    let inputField = document.querySelector('.input')
    let gameInfo = document.querySelector('.gameInfo')

    bannerContent.append(username)
    document.querySelector('#p1').append(username)

    gameInfo.style.display = "flex"
    inputField.style.display = 'none'
    // banner.style.display = 'flex'
    bannerContent.style.display = 'flex'
    // infoFields.style.display = 'flex'
    // picFrame.style.display = 'contents'
}

function stopAnim(){
    let start = document.getElementById('startButton')
    
    start.style.animation = "none"
}



function startGame() {
    animate()
}

function gameOver(){
    let el = document.createElement('div')
    el.classList.add('gameOverText')
    el.innerText = "GAME OVER"
    document.body.appendChild(el)
    document.getElementById('s1').innerHTML = Player.score.valueOf
}

function storeScore() {
    let sb = document.querySelector('.leaderBoard')
    let ps = document.getElementById('scoreNum').value
    let pn = document.querySelector('.bannerContent').value
    sb.appendChild(pn)
    sb.appendChild(ps)
}