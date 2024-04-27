# Person - User Management System

[Read this page in Portuguese](README-pt.md)   |   [Read this page in English](README.md)

Person is a user management system designed to handle user registration, authentication, and profile updates. It leverages modern web technologies and follows best practices in software development. This project is structured to ensure scalability, maintainability, and ease of use.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- PostgreSQL (v13.x or higher)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/walttinho_/teste_Person.git
   ```
2. Install NPM packages
   ```bash
   npm install
   ```
3. Configure your environment variables in a `.env` file at the root of the project. You can use `.env.example` as a template.

### Environment Variables

Environment variables are used to configure the behavior of the application. Create a `.env` file at the root of the project and add the following variables:

- `PORT`: The port on which the server will be started.
- `DB_HOST`: The host of the PostgreSQL database.
- `DB_USER`: The user of the PostgreSQL database.
- `DB_PASSWORD`: The password of the PostgreSQL database.
- `DB_NAME`: The name of the PostgreSQL database.
- `DB_PORT`: The port of the PostgreSQL database.
- `DB_SSL`: If `true`, uses SSL to connect to the database.
- `JWT_SECRET`: The secret key used to sign JWT tokens.

Example `.env` file:

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

Make sure to replace `yourpassword`, `yourdbname`, and `yourjwtsecret` with appropriate values for your environment.

### Usage

#### Start the Server

To start the server, use the following command:

```bash
npm start
```

This command starts the server on the port specified in the `PORT` environment variable. If `PORT` is not defined, the server will start on the default port 3000.

#### Run Tests

To run the project tests, use the following command:

```bash
npm test
```

This command runs all the tests defined in the project using Jest.

#### Available Scripts

- `npm start`: Starts the server.
- `npm test`: Runs the project tests.
- `npm run dev`: Starts the server in development mode with automatic reloading.

## Project Structure

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

## Technologies Used

- **Node.js**: The runtime environment that executes JavaScript code outside of a web browser.
- **Express.js**: A minimalist and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **PostgreSQL**: A powerful open-source object-relational database system.
- **Knex.js**: A "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and easy to use.
- **bcrypt**: A library to help you hash passwords.
- **jsonwebtoken**: An implementation of JSON Web Tokens.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **dotenv**: Module to load environment variables from a `.env` file.
- **yup**: JavaScript schema validation library.
- **axios**: Promise-based HTTP client for the browser and node.js.

### Development Dependencies

- **nodemon**: Tool that helps develop node.js applications by automatically restarting the server when files change.
- **jest**: JavaScript testing framework with a focus on simplicity.

## Database Connection

The project uses Knex.js to interact with the PostgreSQL database. The database connection is configured in `src/database/connection.js`. The `knex` instance is exported and used throughout the project to perform database operations.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Walter Netto - [@Linkedin](https://www.linkedin.com/in/walterfnetto/) - walter.netto@live.com

[Project Deployment](https://teste-triibo.onrender.com/docs)