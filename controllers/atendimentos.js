// Rotas
module.exports = app => {

  // Rota via Get
  app.get('/atendimentos', (req, res) => {
    console.log(req.body);

    res.send('Você esta na rota de atendimentos via GET');
  })

  // Rota via Post
  app.post('/atendimentos', (req, res) => {
    console.log(req.body);

    res.send('Você esta na rota de atendimentos via POST');
  })

}