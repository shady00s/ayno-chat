export default function convertBase64(image){
    return new Promise(async (resolve,reject)=>{
        let reader = new FileReader()
        reader.readAsDataURL(image)

        reader.onload = (()=>{
            resolve(reader.result)
        })
        reader.onerror = ((error)=>{
            reject(error)
        })
    })
}