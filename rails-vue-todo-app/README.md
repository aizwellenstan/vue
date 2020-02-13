# Rails Vue Todo App

## Prerequisites
You must install foreman globally with `gem install foreman`

## Running the project
You run the project with npm: `npm start`. This will run `foreman` with configurations for web and webpack so that it properly runs Vue.js

## NPM Scripts
* `npm start` - As described above, will start the project
* `npm run setup` - Setups up the Postgres database and runs migrations
* `npm run reset` - Drops, creates, and runs migrations for a fresh schema

## Live Demo
A live demo of this app can be found on [Heroku](https://tranquil-hollows-47721.herokuapp.com/)

## Todos (no pun intended)
* Better error formatting
* Sort todos when viewing `all` todos with incomplete todos first
* Validation errors don't change for another error if there already is an error on the page
* Better handling of hover events for mobile or a different solution
