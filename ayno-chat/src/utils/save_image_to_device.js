export default  function saveImageToDevice(event,targetImage){
    const image = new Blob([
        targetImage
    ],{type:"image/*"})
    const element = document.createElement('a')
    element.href = targetImage
    element.download = `ayno${Math.round(Math.random()*10)}.png`
    element.target ="_blank"
    element.click()
    URL.createObjectURL(image)
}