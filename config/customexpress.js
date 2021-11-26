// Libs importadas
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

// Cofigurações de formato de Req e Res q o serve entende
module.exports = () => {
  const app = express();

  // Aceitar Req via URL
  app.use(bodyParser.urlencoded({extended: true}));
  // Aceitar Req via Json
  app.use(bodyParser.json());

  // Pegar todas as rotas na 'controller' e incluir na vari "app"
  consign()
    .include('controllers')
    .into(app)

    return app
}