## Rodar o repositório:

### Na primeira vez é necessário instalar as dependencias:
1. `npm install` na pasta raiz
2. Se for em ambiente local: `npm install --dev` na pasta raiz
3. `npm install jsonwebtoken` na pasta raiz  - para utilizar as validações JWT
4. `npm install bcryptjs` na pasta raiz - para criptografar as senhas dos usuários nas tabelas
5. Criar arquivo `.env`
6. Atualizar arquivo `.env_example` conforme desejar.
7. `cp .env_example .env` na pasta raiz

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

### Abrir um novo terminal e criar as migrations
1. `npx sequelize-cli migration:generate --name nome_tabela`

## Criação de Pastas e Arquivos
1. Criar uma pasta `routes` dentro da pasta `src`.
2. Adicionar arquivos `(nome do arquivo).routes.js` dentro da pasta `routes`.
3. Adicionar arquivos `(nome do arquivo).js` na pasta models
    Esse arquivo é uma representação da tabela em seu banco de dados.
4. Criar uma pasta `middlewares` dentro da pasta `src`.
5. Adicionar arquivos `(nome do arquivo).js` dentro da pasta `middlewares`
    Esse arquivo serve para fazer validação nas rotas
6. Criar arquivos `Nome.js`, na pasta models, com a primeira letra maiúscula
    Esses arquivos servem para definir os modelos de dados, representando as tabelas do banco de dados e suas relações.
7. Criar a pasta `controllers` dentro da pasta `src`.
8. Criar arquivos `NomeDoArquivoController.js` dentro da da pasta `controllers`.
    Esses arquivos servem para definir as funções que controlam as interações com os modelos de dados.