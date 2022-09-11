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



// Animate -> request frame loop // ********

function animate() {
    requestAnimationFrame(animate)

    cvs.drawImage(image, 0, 0)
    
    enemies.forEach(enemy => {
        enemy.update()
    })
    buildTiles.forEach(tile =>{
        tile.update(mouse)
    })

    towers.forEach(tower =>{
        tower.draw()
        tower.projectiles.forEach((projectile, i) => {
            projectile.update()

            const xDistance = projectile.enemy.center.x - projectile.position.x
            const yDistance = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDistance, yDistance)
            if (distance < projectile.enemy.radius + projectile.radius){
                tower.projectiles.splice (i, 1)
            }
        })
    })
    
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
    

}


