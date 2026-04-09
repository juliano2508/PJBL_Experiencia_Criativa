# Sistema de Gestão de Usuários (CRUD Completo)

Este é um projeto web completo utilizando React (Frontend), Node.js/Express (Backend) e MySQL (Banco de Dados).

## Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando

## 1. Configuração do Banco de Dados
1. Abra o MySQL Workbench.
2. Importe o arquivo `database.sql` fornecido na pasta raiz do projeto.
3. Se necessário, ajuste as credenciais (usuário e senha) no arquivo `backend/server.js` na função `mysql.createConnection`.

## 2. Rodando o Backend
1. Navegue até a pasta do backend: `cd backend`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `node server.js`
(O servidor rodará na porta 3001)

## 3. Rodando o Frontend
1. Navegue até a pasta do frontend: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie a aplicação: `npm start`
(O frontend abrirá automaticamente no navegador na porta 3000)
