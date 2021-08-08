function auth(req,res,next){
    if(req.session.user == undefined){
        res.redirect('/user/login');
    }else{
        next()
    }
}
module.exports = auth 