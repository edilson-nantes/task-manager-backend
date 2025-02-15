# Teste técnico SunHub
Resolução do desafio fullstack do processo seletivo da SunHub. Neste repositório está contido apenas o backend, para entrar no frondend acesse: https://github.com/edilson-nantes/task-manager-frontend

<h1 align="center">
<br>
Desafio processo Seletivo SunHub
</h1>

</h1>

## Tecnologias

As tecnologias utilizadas foram:

- **Typescript** — Linguagem de programação usada para desenvolver a aplicação.

- **NestJs** —  Framework Node.js para construir aplicações server-side escaláveis e eficientes.

- **TypeORM** — Biblioteca de mapeamento objeto-relacional para TypeScript e JavaScript.

- **PostgreSQL** — Banco de dados relacional para armazenar as informações.

 ## Descrição
 O projeto se baseia em construir um gerenciador de tarefas(Task Manager). Onde o backend consiste em uma API Rest com autenticação de usuários e funcionalidade de CRUD para as tarefas.

- Usuário
- Tarefas

 ## Requisitos

**User - {POST} /api/users/register:** 
- Registro de novos usuários com os campos: name, email e password.
- Valida a unicidade do email.
- Retorna o token JWT após o registro para autenticação do usuário.
- Exemplo de objeto a ser enviado:
  ```bash
    {
      "name": "Edilson",
      "email": "nantes.junior@gmail.com",
      "password": "mysecretpassword"
    }
  ```

**User - {POST} /api/login:** 
- Autenticação de usuários com os campos: name e email.
- Valida se as credenciais fornecidas são válidas
- Retorna o token JWT após a validação das credenciais do usuário.
- Exemplo de objeto a ser enviado:
  ```bash
    {
      "email": "nantes.junior@gmail.com",
      "password": "mysecretpassword"
    }
  ```

**Task - {GET} /api/tasks:** 
- Retorna todas as tarefas do usuário logado

**Task - {POST} /api/tasks:** 
- Cria uma nova tarefa com os campos: title, description, status
- Exemplo de objeto a ser enviado:
  ```bash
    {
      "title": "Titulo da tarefa",
      "description": "Descrição da tarefa",
      "status": "em progresso"
    }
  ```

**Task - {PUT} /api/tasks/{id}:** 
- Atualiza uma tarefa do usuário.
- Exemplo de objeto a ser enviado (para esse caso, pode ser enviado o objeto completo ou parte dele):
  ```bash
    {
      "title": "Titulo da tarefa",
      "description": "Descrição da tarefa",
      "status": "em progresso"
    }
  ```

**Task - {DELETE} /api/tasks/{id}:** 
- Deleta uma tarefa

## Funcionalidades Desenvolvidas
    - Autenticação de usuários usando um email e senha.
    - Cadastro de novos usuários com informações de nome, email, senha.
    - CRUD de tarefas para o gerenciamento de lista de tarefas.


##  Download e Teste



-  Instalar o [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/pt-br/download/) + [npm](https://www.npmjs.com/get-npm), [Docker](https://www.docker.com/) e [Imagem docker do PostgreSQL](https://hub.docker.com/_/postgres):

```bash
# Versões utilizadas no desenvolvimento.
 node -v
v22.14.0

 npm -v
10.9.2

docker -v
Docker version 27.2.0, build 3ab4256
```

```bash
# Clonar o repositório
 git clone https://github.com/edilson-nantes/task-manager-backend/

#Instalar o docker
 sudo apt-get install ./docker-desktop-amd64.deb

#Baixar a imagem do postgres
 docker pull postgres

#Iniciar o container postgres(no desenvolvimento foram usadas as mesmas credenciais padrão da imagem)
 docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

#Entrar no diretório
 cd task-manager-backend

#Crie um arquivo com o nome .env e copie as informações do arquivo .env.development para ele.

#Instalar as dependências
 npm install
```
- As credenciais do arquivo .env podem ser alteradas de acordo com a necessidade, mas as credenciais usadas no desenvolvimento foram:

```bash
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_PORT=5432
DB_DATABASE=tasks

JWT_SECRET=senhaMuitoGrandeParaNãoSerDescobertaabsdfgasdfhgdf
JWT_EXPIRES_IN=7d
```

- Digite o seguinte comando para rodar a aplicação:
```bash
npm run start:dev
```

- Por ultimo abra sua ferramenta de teste para API e digite o seguinte base URL:

```
localhost:8080/api
```

---
