## Descrição

Este é o projeto de backend do case (desafio técnico)

## Setup do projeto

```bash
# Use o docker para levantar os serviços do postgres e do redis
$ docker compose up -d

# Após os serviços do docker estiverem rodando, instale as dependências do projeto
$ npm ci

# Por fim, execute as migrations do prisma orm
$ npx prisma migrate dev
```

## Para rodar o projeto

```bash
# Comando para rodar o projeto após o setup
$ npm run start
```

## Rotas do projeto
```bash
# GET    http://localhost:3333/api/v1/users
# POST   http://localhost:3333/api/v1/users
# GET    http://localhost:3333/api/v1/users/:id
# PUT    http://localhost:3333/api/v1/users/:id
# DELETE http://localhost:3333/api/v1/users/:id
```