# Birdie

## Production version 
Birdie app’s production version run’s in Heroku: https://hidden-plateau-82521.herokuapp.com/ 

Use as any PWA 

Login as Test User: 

username: elisatest 

password: testie

## Development version
For development and local testing you can clone the projects from Github.

Frontend source code: https://github.com/elisanur/birdie 

Backend source code is in this repository.

### Instruction for running the development version
After cloning both projects to their own folders, run “npm install” in both projects' root folders to install the dependencies and development dependencies.
Predefined scripts can be found in package.json file.
Scripts can be run with syntax “npm run <script name>” e.g. “npm run watch”. The scripts including local paths must be corrected to your local use.
Frontend project's instructions can be found in the source code's README file.

## Integration testing in backend

After following the instructions for running the development version, you have also installed testing libraries jest and supertest.

##### Testing libraries can be also separately installed:

npm install --save-dev jest

npm install --save-dev supertest

At the moment 9/10 tests should succeed, and "deletion of an observation › an observation can be deleted" fails, because deletion functionality is disabled for now.

##### Run all tests:

npm test

##### Run a specific test:

npx jest -t 'observations are returned as json'

##### Examples of running tests using npm:

npm t -- tests/observation_api.test.js

npm t -- -t 'observations are returned as json'

npm t -- -t 'observations'
