// Importando as cofigurações de pro server ler
const customExpress = require('./config/customexpress')
const app = customExpress();

// Subindo o server na porta 3000
app.listen(3000, () => console.log(`Server's up`));