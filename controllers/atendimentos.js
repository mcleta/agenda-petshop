const Atendimento = require("../models/atendimentos")

// Rotas
module.exports = app => {

  // Rota via Get
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista(res);
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    Atendimento.buscaPorId(id, res);
  })

  // Rota via Post
  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;

    Atendimento.adiciona(atendimento, res);
  })

  // Rota Patch
  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    
    Atendimento.altera(id, valores, res);
  });

  // Rota Delete
  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.deleta(id, res);
  });

}