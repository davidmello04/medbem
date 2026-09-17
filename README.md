# Medbem

Plataforma full-stack para gerenciamento de pacientes, profissionais de saúde e consultas médicas.

O projeto combina uma interface responsiva em Vue.js com uma API desenvolvida em AdonisJS e persistência em PostgreSQL. A proposta é centralizar o fluxo operacional de uma clínica, facilitando o cadastro de pacientes e profissionais, o agendamento de consultas e o acompanhamento dos atendimentos.

## Funcionalidades

- cadastro e listagem de pacientes;
- atualização e remoção de pacientes;
- cadastro e listagem de profissionais;
- criação, listagem, atualização e cancelamento de consultas;
- associação entre pacientes, profissionais e consultas;
- navegação entre módulos com Vue Router;
- interface construída com componentes do Vuetify;
- API REST com persistência em PostgreSQL.

> O projeto está em evolução. Autenticação, regras avançadas de agenda, testes e deploy de demonstração fazem parte do roadmap.

## Tecnologias

### Frontend

- Vue.js 3
- Vuetify 3
- Vue Router
- Axios
- Vite
- Sass

### Backend

- Node.js
- TypeScript
- AdonisJS 6
- Lucid ORM
- VineJS
- PostgreSQL

## Estrutura

```text
medbem/
├── medbem-api/   # API REST, modelos, migrations e regras de negócio
└── medbem-ui/    # interface web em Vue.js
```

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm
- PostgreSQL

### 1. Clonar o repositório

```bash
git clone https://github.com/davidmello04/medbem.git
cd medbem
```

### 2. Configurar a API

```bash
cd medbem-api
npm install
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Preencha no `.env` as credenciais do PostgreSQL e gere uma chave própria para `APP_KEY`.

Execute as migrations e inicie a API:

```bash
node ace migration:run
npm run dev
```

Por padrão, a API ficará disponível em `http://localhost:3333`.

### 3. Configurar o frontend

Em outro terminal:

```bash
cd medbem-ui
npm install
npm run dev
```

Abra no navegador o endereço informado pelo Vite.

## Endpoints principais

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/patients` | lista pacientes |
| `POST` | `/patients` | cadastra um paciente |
| `PUT` | `/patients/:id` | atualiza um paciente |
| `DELETE` | `/patients/:id` | remove um paciente |
| `GET` | `/doctors` | lista profissionais |
| `POST` | `/doctors` | cadastra um profissional |
| `GET` | `/consults` | lista consultas |
| `POST` | `/consults` | agenda uma consulta |
| `PUT` | `/consults/:id` | atualiza uma consulta |
| `DELETE` | `/consults/:id` | cancela uma consulta |

## Roadmap

- [ ] autenticação e autorização por perfil;
- [ ] validação de conflito de horários;
- [ ] filtros, busca e paginação;
- [ ] dashboard com indicadores;
- [ ] testes automatizados das regras de agendamento;
- [ ] Docker para ambiente local;
- [ ] documentação OpenAPI/Swagger;
- [ ] deploy de demonstração com dados fictícios;
- [ ] capturas de tela e vídeo de apresentação.

## Autoria

Projeto desenvolvido por [David Melo](https://github.com/davidmello04).

[LinkedIn](https://www.linkedin.com/in/david-melo-/)
