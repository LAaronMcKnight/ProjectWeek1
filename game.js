const canvas = document.querySelector('canvas')
const cvs = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 780

const image = new Image()
image.onload = ()=>{
cvs.drawImage(image, 0, 0, canvas.width, canvas.height)
cvs.fillStyle = 'goldenrod'
cvs.fillRect(50, 50, 30, 30)

}
image.src = '/images/map1.png'