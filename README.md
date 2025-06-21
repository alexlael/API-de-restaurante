# API de Restaurante

Este repositório faz parte da minha jornada de aprendizado com Node.js e TypeScript. A aplicação é uma API REST simples para gerenciar pedidos em mesas de um restaurante.

## Sobre o projeto

A API foi desenvolvida utilizando **Express** e **Knex** com banco de dados **SQLite**. Ela oferece rotas para cadastro de produtos, controle de mesas e de suas sessões (abertura e fechamento) e lançamento de pedidos. O código está em TypeScript e faz uso da biblioteca **zod** para validação e de um middleware de tratamento de erros.

### Funcionalidades principais
- Cadastro, consulta, atualização e remoção de produtos.
- Listagem de mesas disponíveis.
- Abertura e fechamento de sessões das mesas.
- Registro de pedidos com cálculo de total por sessão.

Com esse projeto foi possível aprender:
- Configuração de um servidor Express com TypeScript.
- Criação de migrações e seeds com Knex para um banco SQLite.
- Validação de dados com zod e tratamento de erros personalizado.
- Organização de rotas e controllers em uma API REST.

## Instalação
1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```
2. Rode as migrações e seeds:
   ```bash
   npm run knex -- migrate:latest
   npm run knex -- seed:run
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
O servidor iniciará por padrão na porta **3333**.

## Estrutura do projeto
- `src/controllers` &ndash; Lógica das requisições.
- `src/routes` &ndash; Definição das rotas da API.
- `src/database` &ndash; Configuração do Knex, migrações e seeds.
- `src/utils` &ndash; Utilitários como a classe `AppError`.

## Licença
Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
