export default function colorGenerator():string{
    const red =(Math.floor(Math.random() * 60))
    const green = (Math.floor(Math.random() * 40))
    const blue = (Math.floor(Math.random()* 39))

    return `rgb(${red},${green},${blue})`
}