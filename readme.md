## Sobre o projeto

## Índice
- [Visão Geral](#visão-geral)
- [Melhorias](#melhorias)
- [Techs Utilizadas](#techs-utilizadas)
- [Rodar repositório](#rodar-repositório)
- [Expecificação branches](#expecificação-branches)
- [Pastas](#pastas)
- [Swagger](#swagger)

## Visão Geral
### Nome do software
Adventure-Driven Developer - Uma alusão ao POO
### Resumo
Para a galera que curte aquela TRIP, o software proposto é uma plataforma de gestão de viagens, permitindo aos usuários cadastrarem destinos, compartilharem comentários e avaliações. Com intúito de ajudar na criação de uma comunidade onde viajantes possam divulgar suas experiências. Utiliza a autenticação JWT para a segurança, o sistema gerencia o cadastro de usuários, locais de viagem e seus detalhes. Além disso, oferece funcionalidades para listagem, edição e exclusão de destinos de forma segura e personalizada para cada usuário. Com documentação detalhada e integração com o Swagger, o software simplifica a organização e compartilhamento de informações de viagens.

Na parte de desenvolvimento foram utilizadas duas APIs externas: <a href="https://viacep.com.br/">ViaCEP</a> e <a href="https://nominatim.openstreetmap.org/ui/search.html">OpenStreetMap</a> para fazer a requisições http e buscar os dados de endereço e localização de usuários e destinos.<br>
O sistema já inicia com o usuário admin 
Foram implementados middlewares de autenticação e uma lógica para verificar se o usuário autenticado é um admin, que permite fazer o CRUD de usuários. E que não pode ser atualizado ou removido.
<br><br>
[Índice](#índice)

## Melhorias
### Melhorias e funcionalidades futuras
Adicionar um sistema de classificação, para que outros usuários comentem e possar dar notas de 1 até 5.

Fazer a conexão direta lugares regionais pouco divulgados como pousadas, hostels, campings.

Poder adicionar amigos, e criar um chat entre eles.

Enfim, transformar em uma rede social destinada somente para quem curte aquela trip, seja ela, longa de férias ou aquele bate e volta.

O `middleware` verificarEmailCPF, funciona bem em cadastrar usuário, porém, para atualizar, seria interessante colocar um que permita manter igual o email do usuária que está sendo modificado. Pois ele faz a verificação e não deixa usar um email que já foi cadastrado.<br><br>
[Índice](#índice)

## Techs utilizadas
[![My Skills](https://skillicons.dev/icons?i=nodejs,postgresql,express,postman,sequelize,vscode,git,github,npm)](https://skillicons.dev)<br><br>
[Índice](#índice)

## Rodar repositório
### Na primeira vez é necessário instalar as dependencias:
1. `npm install` - na pasta raiz
2. Se for em ambiente local: `npm install --dev` - na pasta raiz
3. `npm install jsonwebtoken` - na pasta raiz  - para utilizar as validações JWT
4. `npm install axios` - na pasta raiz - para fazer requisições de APIs.
5. Atualizar arquivo `.env_example` conforme necessário para fazer a integração com o arquivo `.env` que será criado.
6. `cp .env_example .env` na pasta raiz

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

### Abrir um novo terminal e criar as migrations
1. `npx sequelize-cli migration:generate --name nome_tabela`
### Integrar as migrations ao banco de dados
1. `npx sequelize db:migrate` <br><br>
[Índice](#índice)

## Expecificação branches
### branch - main
Esta é a branch principal do projeto, a branch de produção.
### branch - develop
Esta branch foi utilizada como a branch de desenvolvimento
### branch - features
Estas branches serão utilizadas para adicionar novas tarefas e funcionalidades ao código.<br><br>
[Índice](#índice)

## Pastas
### Criação de Pastas e Arquivos
1. Criar uma pasta `routes` dentro da pasta `src`.
2. Adicionar arquivos `(nome do arquivo).routes.js` dentro da pasta `routes`.<br>
    Cada um desses arquivos serve para criar a lógica das rotas de requisição HTTP feitas pelo usuário.
3. Adicionar arquivos `(nome do arquivo).js` na pasta models.<br>
    Esse arquivo é uma representação da tabela em seu banco de dados.
4. Criar uma pasta `middlewares` dentro da pasta `src`.<br>
5. Adicionar arquivos `(nome do arquivo).js` dentro da pasta `middlewares`.
    Esses arquivos servem para fazer as validações nas rotas, garantir as regras de negócio e ajudar na lógica.<br>
    Para acessar a documentação das Middlewares-Express, acesse: https://expressjs.com/pt-br/guide/using-middleware.html
6. Criar arquivos `Nome.js`, na pasta models, com a primeira letra maiúscula.<br>
    Esses arquivos servem para definir os modelos de dados, representando as tabelas do banco de dados e suas relações.
7. Criar a pasta `controllers` dentro da pasta `src`.
8. Criar arquivos `NomeDoArquivoController.js` dentro da da pasta `controllers`.<br>
    Esses arquivos servem para definir as funções que controlam as interações com os modelos de dados.
9. Criar arquivo `swagger.js` na pasta `src`.<br>
10. Foi adicionado ao projeto, a Collection Viagem365 utilizada para testes das rotas no Postman, no arquivo `Viagem365.postman_collection`<br>
Para acessar a documentação do Swagger, acesse: https://swagger-autogen.github.io/docs <br><br>
[Índice](#índice)

## Swagger
### Depois de criar a arquivo `swagger.js` e a lógica de acordo com a documentação:
1. `npm install swagger-ui-express` - na pasta raiz - serve para criar a tela de interface
2. `npm install swagger-autogen` -na pasta raiz - serve para gerar o documento do swagger
3. Criar as documentações das rotas para realizar os testes na interface do `Swagger`.
4. Utilizar a rota http://localhost:3000/docs/, para acessar a documentação de rotas do projeto.<br><br>

[Índice](#índice)