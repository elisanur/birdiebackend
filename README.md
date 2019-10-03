# Mongo

Run server: mongod
Run client (for debugging): mongo

Db files: /data/db
Server address: 127.0.0.1:27017
port=27017

create db user: db.createUser({user:"databaseUser",pwd:"localpassword",roles:[]})


#Automated tests

Testing library: 
Jest, supertest

Installation as development dependency: 
npm install --save-dev jest
npm install --save-dev supertest

Run all tests:
npm test
Run a specific test:
npx jest -t 'observations are returned as json'
Using npm:
npm t -- tests/observation_api.test.js
npm t -- -t 'observations are returned as json'
npm t -- -t 'observations'
