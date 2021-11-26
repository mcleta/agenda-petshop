// Importando as cofigurações pro server ler
const customExpress = require('./config/customexpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect( (erro) => {
  if (erro) {
    console.log(erro);
  }
  else{
    console.log('DB Connection Successful');

    Tabelas.init(conexao);

    const app = customExpress();

    // Subindo o server na porta 3000
    app.listen(3000, () => console.log(`Server's up`));
  }
});

