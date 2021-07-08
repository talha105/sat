export default function userKeyGenerator (chaine)
{
    var v_char;
    var taille, max,  c;
    var fact, CODE,result ;

    result = 0;
    taille = chaine.length;

    if (taille ===0)
    { return 0; }

    for(var i = 0 ; i<= taille-1; i++ )
    {
        max = taille - i ;
        fact = 8;

        for (var j = 0 ; j <= max; j++)
        {
           fact += fact * j; 
        }

        v_char = chaine.slice(i, 1+i);
        c = Number( v_char);
        CODE = c * fact; 
        result = result + CODE;
    }

    return result;
}