# Teste Peixe 30

Este projeto é constituído por uma API (pasta backend) feita com Typescript, NodeJs, Express, Docker, Prisma e Postgres, o qual busca, cadastra, altera e deleta dados dos contatos dos usuários, e pelo frontend da aplicação (pasta mobile), feito com React Native e Typescript, o qual apresenta 
um login, e após a autenticação, redirecionamento do usuário para o dashboard com os contatos, podendo criar um novo, editar ou deleter um contato.

## Requisitos para rodar o projeto

- [Node LTS](https://nodejs.org/en)
  - Usando [`nvm`](https://github.com/nvm-sh/nvm)
    - `nvm install`
    - `nvm use`
- [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (Opcional)
- [Docker](https://www.docker.com/)
- Ambiente configurado para [React Native](https://reactnative.dev/docs/set-up-your-environment)

### Como rodar na minha máquina?

- Clone o projeto `https://github.com/Igormazetti/peixe30-teste.git`
- Ou clone o projeto com SSH `git@github.com:Igormazetti/peixe30-teste.git`

#### Backend

- Abra um terminal mo projeto e navegue até a pasta backend `cd backend`, ou clique com o botão direito em cima da pasta "backend" e selecione "Abrir no terminal Integrado";
- Altere o arquivo docker-compose.yml com os dados do banco de dados;
- Rode o comando `docker compose up -d` para gerar o banco de dados no docker;
- Configure o arquivo .env com as variáveis da porta da aplicação e url do banco de dados;
- Rode `yarn` ou `npm i` para instalar os pacotes do projeto.
- Rode `npm run prisma-setup` e depois `npm run seed` par apopular o banco de dados.
- Rode `yarn dev` ou `npm run dev`
- Pronto 🎉

#### Frontend

- Abra um terminal mo projeto e navegue até a pasta mobile `cd mobile`, ou clique com o botão direito em cima da pasta "mobile" e selecione "Abrir no terminal Integrado"
- Rode `yarn` ou `npm i` para instalar os pacotes do projeto.
- Rode `yarn start` ou `npm run start`
- Usuário de acesso: email: admin@admin.com, senha: admin
- Pronto 🎉


