
export default function checkSC(text){

    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return format.test(text)
}