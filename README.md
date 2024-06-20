## Description

This is a task created to Slash comapany that is basically an OSM (Order System Management) using tech stack: Nestjs, Prisma as ORM and PostgreSQL database.

## Modules
The modules implemented are :
1. User
2. Order
3. Cart
4. Product
5. Coupon *As a bonus 

Futher details about the endpoints can be found in the api documentation in postman.

## API Documentation
Link to documentation: https://documenter.getpostman.com/view/33222407/2sA3XV8eic

## Installation

```bash
$ npm install
```

## Database Migration

```bash
$ prisma migrate dev --name <migration-name>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The server will run by default on : http://localhost:3000

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
