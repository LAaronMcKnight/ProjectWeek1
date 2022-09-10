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

    const enemies = []

function spawnWave(num) {
    for (let i = 1; i <= num; i++) {
        const gap = i * 60
        enemies.push(new Enemy({ position: {x: waypoints[0].x - gap, y: waypoints[0].y} }))
    }
}

spawnWave(50)