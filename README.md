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


## Setup 
You will need to run your database locally and add your connection string to a .env file. 
Example:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

## Database Migration

```bash
$ prisma migrate dev --name <migration-name>
```
## Installation

```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
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
