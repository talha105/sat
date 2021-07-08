export default function dateFormat(date){
    if(date){
        const formatDate= date.getDate()+"/"+"0"+(date.getMonth()+1)+"/"+date.getFullYear();
        return formatDate
    }else{
        return date
    }

}