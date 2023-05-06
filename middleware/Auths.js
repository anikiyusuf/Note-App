 const isLoggedIn = function(req,res,next){
    if(req.user){
        next();
    }else{
        return res.status(404).send('Access Denied')
    }
}


module.exports = { isLoggedIn }