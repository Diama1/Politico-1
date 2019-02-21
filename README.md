## Politico
 [Politico](http://politiqo.herokuapp.com) enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency.

 
[![Build Status](https://travis-ci.org/dusmel/Politico.svg?branch=develop)](https://travis-ci.org/dusmel/Politico) [![Coverage Status](https://coveralls.io/repos/github/dusmel/Politico/badge.svg?branch=develop)](https://coveralls.io/github/dusmel/Politico?branch=develop) [![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/dusmel/Politico/blob/develop/LICENSE.md) ![](https://img.shields.io/npm/v/npm.svg?style=flat)

[![Maintainability](https://api.codeclimate.com/v1/badges/aed8283d1f8199d520b2/maintainability)](https://codeclimate.com/github/dusmel/Politico/maintainability) 
## Features

 - Users can sign up. Users can login. Admin (electoral body) can create
 - User can reset password.
 - political parties. Admin (electoral body) can delete a political
 -  party. Admin (electoral body) can create different ​ political
 -  offices​ . Users can vote for only one politician per ​ political
 -  office​ . Users can see the results of election.


## Getting Started

You will need to have [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed to run the application

First clone on your local machine

    git clone https://github.com/dusmel/Politico.git
Run npm install to install modules 

    npm install
Run the server with babel-watch

    npm run dev-start
### Running the tests
This project use [jasmine](https://jasmine.github.io/) to run the test and [coveralls](https://docs.travis-ci.com/user/coveralls/) for coverage

To  run test 

    npm test
  To check errors with eslinter
  

    npx eslint server
##  Deployment
By default the app can be deployed to heroku, check the Procfile to customize how to run your server on production

##  Built with

 - [Node](https://nodejs.org/en/)
 - [Express](https://www.npmjs.com/package/express)
 
####  Authors
 - Hadad Bwenge
##  License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dusmel/Politico/blob/develop/LICENSE.md) file for details

##  API endpoints
Endpoint​ : Create a ​ political party​ 
 POST api/v1/parties
Response spec:

    {
	    "status": 201,
	    "data": {
	        "id": 1,
	        "name": "RNP",
	        "hqAddress": "KK 23 Ave",
	        "logoUrl": "http://localhost:3000/img/1",
	        "createdDate": 1550094379141
	    }
    }

Endpoint​ : GET api/v1/parties/:id
Fetch a specific ​ political party​ recor
Response spec:

    {
    "status": 200,
    "data": {
        "id": 1,
        "name": "RNP",
        "hqAddress": "KK 23 Ave",
        "logoUrl": "http://localhost:3000/img/1",
        "createdDate": 1550094379141
    }
    }

Endpoint​ : GET api/v1/parties/
Fetch all ​ political parties​ records
Response spec:

    {
	    "status": 200,
	    "data": [
	        {
	            "id": 1,
	            "name": "RNP",
	            "hqAddress": "KK 23 Ave",
	            "logoUrl": "http://localhost:3000/img/1",
	            "createdDate": 1550094379141
	        },
	        {
	            "id": 2,
	            "name": "DEMOCRATS",
	            "hqAddress": "KK 33 Ave",
	            "logoUrl": "http://localhost:3000/img/12",
	            "createdDate": 1550094759146
	        }
	    ]
    }

Endpoint​ : PATCH api/v1/parties/:id/name
Edit the name of a specific ​ political party​ .
Response spec:

    {
	    "status": 200,
	    "data": {
	        "id": 2,
	        "name": "REPUBLICAN",
	        "hqAddress": "KK 56 Ave",
	        "logoUrl": "http://localhost:3000/img/32",
	        "createdDate": 1550094759146
	    }
	}

Endpoint​ : DELETE  api/v1/parties/:id
Delete a specific ​ political party.

-----------------
The same apply to offices you will have to replace "parties" by "offices"
