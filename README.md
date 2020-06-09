<p align="center">
 <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#configurando-o-ambiente">Configurando o ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#como-executar">Como executar</a>
</p>


# Sobre

Seu serviço irá receber inicialmente como parâmetro uma URL que deverá ser encurtada seguindo as seguintes regras:
1. Mínimo de 5 e máximo de 10 caracteres.
2. Apenas letras e números.

A url retornada deverá ser salva no banco de dados e possui prazo de validade (você poderá escolher quanto tempo) e ao receber uma url encurtada, deverá fazer o
redirecionamento para a url salva no banco.

### Exemplo ao encurtar
Seu sitema recebe uma chamada para encurtar a url ```http://wisereducacao.com``` e retorna o seguinte json

```
{
  newUrl: "http://localhost:8081/abc123ab";
}
```
### Exemplo ao redirecionar

Ao receber uma chamada para ```http://localhost:8081/abc123ab``` você irá retornar um redirecionamento para a url salva no banco ( ```http://wisereducacao.com``` ), caso não seja encontrada, retornar HTTP 404.

### Orientações Técnicas
O Código DEVE ser desenvolvido em Javascript no interpretador NodeJS.

O endpoint que salva a url e retorna a url encurtada DEVE ser um POST com a rota ```http://localhost:8081/encurtador``` recebendo no body:
```
{
  url: "http://wisereducacao.com";
}
```
O banco de dados pode ser MongoDB , MySQL ou PostgreSQL.

### Desafios Opcionais
Desenvolver Testes :white_check_mark:  
Utilizar Typescript :white_check_mark:  
Ambiente Docker utilizando o docker-compose. :clock1:  
Um ou mais Code Patterns :white_check_mark:  
Realizar o deploy em algum servidor público como Heroku :clock1:  
Documentação em Swagger :white_check_mark: e/ou Postman :clock1:  

# Configurando o ambiente

## Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Postgresql](https://www.postgresql.org/)

## Como instalar?

1. Clone o repositório ```https://github.com/AlexandreWolf/challenge-back-end-encurtador-urls.git```;
2. Acesse o diretório `cd challenge-back-end-encurtador-urls` via CMD;
3. Execute o comando `$ yarn` para instalar as dependências;
4. Altere o arquivo `ormconfig.json` substituindo os valores _host_, _username_, _password_ e _port_;
5. Crie um banco de dados _postgres_ com o nome _url_shortener_. Ex. ```CREATE DATABASE ur_shortner```;
6. Para realizar testes recomendo o uso do cliente REST [Insomnia](https://insomnia.rest/) (clique para baixar). Após instalado importe o arquivo shortener-insomia.json.


## Como executar?
1. Execute `yarn dev: server` para iniciar o servidor;
2. Execute `yarn test` para executar os testes se desejar, e para visualizar os resultados acesse o diretório _coverage/lcov-report_ e dê duplo clique no arquivo _index.html_;
3. Com o servidor em execução acesse ```http://localhost:8081/api-docs```, onde você poderá consultar os endpoints disponíveis e realizar testes.

