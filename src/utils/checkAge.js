export default function checkAge(dateOfBirth){
    
    const currentYear=new Date().getFullYear();
    const age=currentYear- dateOfBirth.getFullYear()
    return age
}