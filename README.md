<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">A <a href="http://nestjs.com/" target="_blank">NEST JS</a> SKELETON BACKEND REST API FOR STARTER KIT PROJECT</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />  
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### About Project

This is a starter kit project to quickly setup and start working on a new Nest JS REST API application. This is a boilerplate with common standard features like authentication, roles management, file management, and more. 

This project will improve development process instead of build a nest js app from scratch, please read the complete [documentation](https://docs.nestjs.com) to know basic fundamental of nest framework.

### Dev Stack

- Nestjs v9.x
- Nestjs platform-fastify v9.x
- Passport Authentication 
    - passport-local
    - passport-jwt
- Postgres
- Type ORM
- Multi Language Using [nestjs-i18n](https://nestjs-i18n.com) 
- Joi Validation
- Handlebars (View engine for email templating)
- Node Mailer
- Multer - uploading file
- and more

## Features

- Basic Authentication
    - Login
    - Register
    - Forgot Password
    - Reset Password
    - Email Verification
    - Verify Account
    - Password Confirmation
    - Whoami
- User Management 
    - CRUD
    - Add User Role
    - Remove User Role
- Role Management 
    - CRUD
- File Management 
    - Upload
    - Download
    - Preview
    - List of User Files
- Modular system and clean architecture
- Secure app HTTP headers using [helmet](https://helmetjs.github.io)
- Multi storage filesystem (local, ftp)
- Mailer Sender
- Fully coded with Typescript
- Database Migration using typeorm migration
- Database seeders
- Rate limiter
- etc

### Installation

```bash
git clone https://github.com/indra-yana/nestjs-starter.git

cp .env.example .env

setup .env

create database

npm install

npm run migration:up

npm run seed:up

npm run start           // start development server
 
npm run start:dev       // start development server in watch mode

npm run build           // build the project

npm run start:prod      // start production server

visit localhost:3000

done!      
```

### Command

```bash
npm run entity:create entity-name             // Create typeorm entity

npm run seed:create seeder-name               // Create seeder file. ex: npm run seed:create Users_Table_Seeder [Title case format]
npm run seed:up                               // Run seeder file
npm run seed:down                             // Revert seeder file
npm run seed:show                             // Show seeder file

npm run migration:create migration-name       // Create migration file. ex: npm run seed:create Create_Users_Table [Title case format]
npm run migration:up                          // Run migration file
npm run migration:down                        // Revert migration file

npm run build                                 // build the project
npm run start:dev                             // start development server
npm run start:prod                            // start development server
```

### API SPEC

#### Base URL :

```bash
http://localhost:3000
```

#### General Header :

```json
{
    "Content-Type": "application/json",     // Optional for some route
    "Accept": "application/json",           // Accept response as json
    "Accept-Language": "id",                // id|en
    "Authorization": "bearer_token"         // for authenticated route
}
```

#### General Params :
```bash
  # Query params for pagination
  # ex: /api/v1/user/list?page=1&limit=10

  page: numeric
  limit: numeric
```

#### Response :

Success Response :

```json
{
    "code": 200,
    "message": "Success Message",
    "data": {
        "success_data"
    }
}
```

Error Response :

```json
{
    "code": 500,
    "message": "Error Message",
    "error": {
        "error_data"
    }
}
```

#### Available REST API

| Name | Method | Path |
| --- | --- | --- | 
| Login | POST | `/api/v1/auth/login` |
| Register | POST | `/api/v1/auth/register` |
| Password Request | POST | `/api/v1/auth/password/email` |
| Password Reset | PUT | `/api/v1/auth/password/reset` |
| Password Confirmation | POST | `/api/v1/auth/password/confirm` |
| Verify Resend | POST | `/api/v1/auth/verify/resend` |
| Verify | PUT | `/api/v1/auth/verify` |
| Whoami | GET | `/api/v1/auth/whoami` |
| Create User | POST | `/api/v1/user/create` |
| Update User | PUT | `/api/v1/user/update` |
| Delete User | DELETE | `/api/v1/user/delete` |
| Add User Role | POST | `/api/v1/user/role/add` |
| Remove User Role | DELETE | `/api/v1/user/role/remove` |
| Show User | GET | `/api/v1/user/show` |
| List User | GET | `/api/v1/user/list` |
| Create Role | POST | `/api/v1/role/create` |
| Update Role | PUT | `/api/v1/role/update` |
| Delete Role | DELETE | `/api/v1/role/delete` |
| Show Role | GET | `/api/v1/role/show` |
| List Role | GET | `/api/v1/role/list` |
| Upload | POST | `/api/v1/file/upload` |
| Download | GET | `/api/v1/file/download/{file_id}` |
| Preview | GET | `/api/v1/file/preview/{file_id}` |
| User Files | GET | `/api/v1/file/user-files` |

### Author

- [Indra Muliana](https://github.com/indra-yana) - <a href="mailto:indra.ndra26@gmail.com" target="_blank">indra.ndra26@gmail.com</a>

### Postman Collection

- <a href="mailto:indra.ndra26@gmail.com" target="_blank">Mail Me</a>

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
