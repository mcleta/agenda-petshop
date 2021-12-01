const moment = require('moment');
const conexao = require('../infra/conexao');

class Atendimento {
  adiciona(atendimento, res){
    const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
    const dataValidator = moment(data).isSameOrAfter(dataCriacao);
    
    const nomeClienteValidator = atendimento.cliente.length >=5

    const validacoes = [
      {
        nome: 'data',
        validator: dataValidator,
        msg: 'A data deve ser do mesmo dia ou de algum posterior'
      },
      {
        nome: 'cliente',
        validator: nomeClienteValidator,
        msg: 'O nome deve ser de uma pessoa real ou ter mais de e4 letras!!!'
      }
    ];

    const erros = validacoes.filter(campo => !campo.validator);
    const temErros = erros.length;

    if (temErros) {
      res.status(400).json(erros);
    } else {
     
      const atendimentoDatado = {...atendimento, dataCriacao, data};

      const sql = "INSERT INTO Atendimentos SET ?";

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  };

  lista(res){
    const sql = 'SELECT * FROM Atendimentos';

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  };

  buscaPorId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  };

  altera(id, valores, res){
    if(valores.data){
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
    }

    const sql = `UPDATE Atendimentos SET ? WHERE id=${id}`;

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  };

  deleta(id, res){
    const sql = 'DELETE FROM Atendimentos WHERE id=?';

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({id});
      }
    });
  };
};

module.exports = new Atendimento;