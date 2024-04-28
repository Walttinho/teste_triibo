# Person - Sistema de Gerenciamento de Usuários

[Read this page in English](README.md)   |   [Leia esta página em português](README-pt.md)


O Person é um sistema de gerenciamento de usuários projetado para lidar com registro de usuários, autenticação e atualizações de perfil. Ele aproveita tecnologias web modernas e segue as melhores práticas em desenvolvimento de software. Este projeto é estruturado para garantir escalabilidade, manutenibilidade e facilidade de uso.

## Começando

Para obter uma cópia local e executá-la, siga estas etapas simples.

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm (v6.x ou superior)
- PostgreSQL (v13.x ou superior)

## Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/walttinho_/teste_Person.git
   ```
2. Instale os pacotes NPM
   ```bash
   npm install
   ```
3. Configure suas variáveis de ambiente em um arquivo `.env` na raiz do projeto. Você pode usar `.env.example` como um modelo.

### Variáveis de Ambiente

As variáveis de ambiente são usadas para configurar o comportamento do aplicativo. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

- `PORT`: A porta na qual o servidor será iniciado.
- `DB_HOST`: O host do banco de dados PostgreSQL.
- `DB_USER`: O usuário do banco de dados PostgreSQL.
- `DB_PASSWORD`: A senha do banco de dados PostgreSQL.
- `DB_NAME`: O nome do banco de dados PostgreSQL.
- `DB_PORT`: A porta do banco de dados PostgreSQL.
- `DB_SSL`: Se `true`, usa SSL para conectar ao banco de dados.
- `JWT_SECRET`: A chave secreta usada para assinar tokens JWT.

Exemplo de arquivo `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
DB_PORT=5432
DB_SSL=false
JWT_SECRET=yourjwtsecret
```

Lembre-se de substituir `yourpassword`, `yourdbname` e `yourjwtsecret` pelos valores apropriados para o seu ambiente.

### Uso

#### Iniciar o Servidor

Para iniciar o servidor, use o seguinte comando:

```bash
npm start
```

Este comando inicia o servidor na porta especificada na variável de ambiente `PORT`. Se `PORT` não estiver definido, o servidor iniciará na porta padrão 3000.

#### Executar Testes

Para executar os testes do projeto, use o seguinte comando:

```bash
npm test
```

Este comando executa todos os testes definidos no projeto usando Jest.

#### Scripts Disponíveis

- `npm start`: Inicia o servidor.
- `npm test`: Executa os testes do projeto.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarregamento automático.



## Estrutura do Projeto

```
.
├── src
│   ├── app.js
│   ├── controller
│   │   └── user
│   │       ├── createUser.js
│   │       ├── deleteById.js
│   │       ├── findAll.js
│   │       ├── findById.js
│   │       ├── loginUser.js
│   │       └── updateUser.js
│   ├── database
│   │   └── connection.js
│   ├── middleware
│   │   └── auth
│   │       └── authorization.js
│   ├── model
│   │   └── user
│   │       ├── addressUser.js
│   │       ├── createUser.js
│   │       ├── deleteById.js
│   │       ├── findAll.js
│   │       ├── findById.js
│   │       ├── findByEmail.js
│   │       └── updateUser.js
│   ├── router
│   │   ├── indexRouter.js
│   │   └── userRouter.js
│   └── service
│       └── user
│           ├── createUser.js
│           ├── deleteById.js
│           ├── findById.js
│           ├── loginUser.js
│           └── updateUser.js
├── test
│   └── user
│       ├── delete.spec.js
│       ├── getAll.spec.js
│       ├── getId.spec.js
│       ├── login.spec.js
│       ├── post.spec.js
│       └── put.spec.js
├── .env.example
├── jest.config.js
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- **Node.js**: O ambiente de execução que executa código JavaScript fora de um navegador da web.
- **Express.js**: Um framework minimalista e flexível de aplicativos da web Node.js que fornece um conjunto robusto de recursos para aplicativos web e móveis.
- **PostgreSQL**: Um poderoso sistema de banco de dados relacional objeto-relacional de código aberto.
- **Knex.js**: Um construtor de consultas SQL "batteries included" para Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle e Amazon Redshift projetado para ser flexível, portátil e fácil de usar.
- **bcrypt**: Uma biblioteca para ajudá-lo a fazer hash de senhas.
- **jsonwebtoken**: Uma implementação de Tokens Web JSON.
- **Jest**: Um Framework de Testes JavaScript encantador com foco na simplicidade.
- **dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.
- **yup**: Biblioteca de validação de esquema para JavaScript.
- **axios**: Cliente HTTP baseado em promessa para o navegador e node.js.

### Dependências de Desenvolvimento

- **nodemon**: Ferramenta que ajuda a desenvolver aplicações node.js reiniciando automaticamente o servidor quando arquivos mudam.
- **jest**: Framework de testes JavaScript com foco na simplicidade.

## Conexão com o Banco de Dados

O projeto usa o Knex.js para interagir com o banco de dados PostgreSQL. A conexão com o banco de dados é configurada em `src/database/connection.js`. A instância `knex` é exportada e usada em todo o projeto para realizar operações no banco de dados.

## Contribuindo

Contribuições são o que tornam a comunidade de código aberto um lugar tão incrível para aprender, inspirar e criar. Todas as contribuições que você fizer são **muito apreciadas**.

1. Faça um fork do projeto
2. Crie sua ramificação de recurso (`git checkout -b feature/AmazingFeature`)
3. Comite suas alterações (`git commit -m 'Adicione alguma AmazingFeature'`)
4. Envie para a ramificação (`git push origin feature/AmazingFeature`)
5. Abra uma solicitação de recebimento (Pull Request)

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE` para obter mais informações.

## Contato

Walter Netto - [Linkedin](https://www.linkedin.com/in/walterfnetto/) - [email](walter.netto@live.com)

[Deploy do Projeto](https://grumpy-xenia-waltertech.koyeb.app/docs)







