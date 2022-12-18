import bcrypt from "bcrypt"
class PasswordManager{
     static encode = async(password:string):Promise<string>=> {
            let hashedPass:string = await bcrypt.hash(password,10)
            return hashedPass;
     }

     static decode = async(password:string,passwordFromDatabase:string):Promise<boolean>=>{
        let decodedPass :boolean = await bcrypt.compare(password,passwordFromDatabase)
        return decodedPass
     }
}

export default PasswordManager