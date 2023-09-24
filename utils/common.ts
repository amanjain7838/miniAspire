const isValid = (str:string)=>{
    const error_data = ['null', null, undefined, 'undefined', '', NaN];
    if(!error_data.includes(str))
        return true;
    else
        return false;
}

export {
    isValid,
}