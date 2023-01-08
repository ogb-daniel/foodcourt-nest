## Installation

```bash
$ yarn install
```

## Running the app

> Note: USES DOCKER COMPOSE

```bash
# foodcourt-nest
## Run postgres db docker container
> yarn db:dev:up
## Remove postgres db docker container
> yarn db:dev:rm
## Run application
> yarn start
## Run application in watch mode
> yarn start:dev
## Run migration on db
> knex migrate:latest
```
