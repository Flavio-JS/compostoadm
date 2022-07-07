import express, { Request, Response } from "express"; //importando a biblioteca "express (framework)" para criar o servidor local
import path from "path";
import mustache from "mustache-express"; //importando a template-engine Mustache

import dotenv from "dotenv"; // importando dotenv

dotenv.config(); // possibilita o sistema ter acesso as variáveis de ambiente

const server = express(); //inicia a função para possibilitar a criação do servidor

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views")); //onde localiza os arquivos mustache(HTML)
server.engine("mustache", mustache()); //define a engine, no caso é a mustache

server.use("/static", express.static(path.join(__dirname, "../public"))); //express transforma os arquivos da pasta "public" em arquivos "estáticos", fazendo isso é possivel acessara pelo navegador os arquivos, por exemplo: http://localhost:3000/static/css/style.css . Utilizamos o 'path.join(__dirname, "../public")' para pegar o diretório absoluto da pasta public

server.use(express.urlencoded({ extended: true })); //possibilita pegar dados do corpo da requisição (dados via POST)

server.use((req: Request, res: Response) => {
  //Caso o usuário digite alguma rota que não foi criada, o servidor exibe essa mensagem
  res.status(404).send("Página não econtrada!"); //res.status(404) mostra pro navegador que é uma página não encontrada
});

server.listen(process.env.PORT); //servidor na porta salva na variável PORT no arquivo .env
