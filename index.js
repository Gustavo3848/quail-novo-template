const express = require('express');
const app = express();
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const carrinhoRoute = require('./routes/carrinho');
const pedidoRoute = require('./routes/pedido');
const userRoute = require('./routes/user');
const produtoRoute = require('./routes/produtos');
const indexController = require('./controllers/indexController');
const mercadoPago = require('mercadopago');
const auth = require('./config/auth');
//Session
app.use(session({
    secret:"Obrigado Deus",
    cookie : {  maxAge : 60000000}
}))
app.use(function(req,res,next){
    res.locals.user = req.session.user || undefined
    res.locals.msg = req.session.msg || false
    res.locals.carrinho = req.session.carrinho || []
    req.session.msg = undefined 
    next();
})
//Midle
app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
  });
//Express Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
//Mercado Pago
mercadoPago.configure({
    sandbox:false,
    access_token:'APP_USR-6333065914637372-082423-370aa18c381c0f9918085494a2b87c4c-235473733'
});
//Public Static
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/',indexController.index);

app.use('/carrinho', carrinhoRoute);
app.use('/pedido',auth, pedidoRoute);
app.use('/user',userRoute);
app.use('/produto',produtoRoute);
const port = 3000;
app.listen(port, function () {  
    console.log("Servidor rodando...")
});