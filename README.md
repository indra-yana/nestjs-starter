<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">A NESTJS SKELETON FOR STARTER PROJECT </h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />  
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Dev Stack

- @nestjs v9.0.x
- @nestjs/platform-fastify v9.3.x
- Passport Authentication - (passport-local, passport-jwt)
- Postgres Database
- Type ORM
- Multi Language Using [nestjs-i18n](https://nestjs-i18n.com) 
- Joi Validation
- Handlebars (View Engine)
- Node Mailer
- Nestjs fastify-multer - uploading file
- and more

### Installation

```bash
git clone https://github.com/indra-yana/nestjs-starter.git
cp .env.example .env
setup .env
create database
npm install
npm run migration:up
npm run start or 
npm run start:dev           // to watch file changes like nodemon
visit localhost:3000  
done!      
```

### About Project

This is a starter kit project to quickly setup and start working on a new nest js application, the project included basic features listed bellow:

## Features

- Basic Authentication
    - Login
    - Register
    - Forgot Password
    - Verify Account
    - Password Confirmation
- User Management (CRUD)
- Role Management (CRUD)
- File Management (Upload, Download, Preview, List of User Files)
- Modular and clean architecture
- Secure app HTTP headers using [helmet](https://helmetjs.github.io)
- Fully coded with Typescript
- etc

### API Spec
#### TODO

### Author

- [Indra Muliana](https://github.com/indra-yana) - <a href="mailto:indra.ndra26@gmail.com" target="_blank">indra.ndra26@gmail.com</a>

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.