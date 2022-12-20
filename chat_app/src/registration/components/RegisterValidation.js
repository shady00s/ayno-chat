class RegisterValidation{
    // check if the name is not less than 4 letters and doesnt contain whitespace
    // return true if both conditions are in the word

/**
 * @param {String} username The date
 * 
 */

    static nameValidation = (username)=>{

       
        if (username.indexOf(' ')===-1 && username.length >3){

            return true 
        }
        else {return false}
  
    }
    //checks if the password is more than 8 characters and confirm password matches the original password
    static passwordValidation(password,confirmPassword){
        if(password === confirmPassword && password.length >=8){
            return true 
        }
        else return false
    }
}
export default RegisterValidation