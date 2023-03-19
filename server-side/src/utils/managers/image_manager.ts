import cloudinary from 'cloudinary'
import * as dotenv from 'dotenv' ;
import Logining from '../logger';

dotenv.config()

  class ImageManager{
   static cloudinary = cloudinary.v2      

   static cloudConfig(){
        return this.cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure:true
          });
    }

    static async uploadImage(userimage:string,userId:string){
         this.cloudConfig()
        try {
        return  await cloudinary.v2.uploader.upload(userimage,{folder:userId} ,(result,err)=>{
            return result
        })
        } catch (error) {
          Logining.error(error)
        }
    }

  }

  export default ImageManager