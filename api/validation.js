module.exports = app => {

    function errorNotExist(data, msg){
        if(!data) throw msg
    }

    function errorExist(data, msg){
        if(data) throw msg
    }

    return { errorNotExist, errorExist }
}