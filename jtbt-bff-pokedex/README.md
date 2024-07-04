# Pokédex

This repository is a template for a Pokédex application of the first 50 pokémons. It contains a server-side
REST API built using [NestJS](https://nestjs.com) and a client-side single-page
application built in [Angular](https://angular.dev)
Built with Angular v18 / standalone components.
Test the application with [Jest](https://jestjs.io)

## Prerequisites
* [Node.js v20](https://nodejs.org/en)

## Setup
1. Clone the repository.
2. Install dependencies:
    ```shell
    cd /path/to/cloned/pokedex/
    cd jtbt-bff-pokedex/
    npm install
    cd ../jtbt-fed-pokedex/
    npm install
    ```

## Run
In two separate shells, start the API and app:
```shell
cd jtbt-bff-pokedex/
npm run start
```
```shell
cd jtbt-fed-pokedex/
npm ng s
```
Both the API and app will rebuild as changes are made to them.

## Test
```shell
npm run test
```