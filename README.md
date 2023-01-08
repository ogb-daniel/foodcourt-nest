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

## Hosted Api

> > https://foodcourt-nest.vercel.app/

## Requests that can be sent

NOTE: <host> can be the hosted url or local route

> > POST<host>/brands
> > POST, GET <host>/brands/:brandId/addons
> > POST <host>/brands/:brandId/addon-categories
> > GET, PATCH, DELETE <host>/brands/:brandId/addons/:addonId
