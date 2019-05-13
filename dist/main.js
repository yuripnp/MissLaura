var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    request = require('request');

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .use(function(req, res, next){
		res.setHeader("Access-Control-allow-Origin", "*");
		res.setHeader("Access-Control-allow-Methods", "GET, POST, PUT, DELETE");
		res.setHeader("Access-Control-allow-Headers", "Content-type");
		res.setHeader("Access-Control-allow-Credentials", true);
		next();
  })

  .get('/', function(req, res){
	res.send('ola');
   })


  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);

/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const usuarios_router_1 = require("./routers/usuarios.router");
const profissional_router_1 = require("./routers/profissional.router");
const salao_router_1 = require("./routers/salao.router");
const server = new server_1.Server();
server.bootstrap([usuarios_router_1.usuarioRouter, profissional_router_1.profissionalRouter, salao_router_1.salaoRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});*/
