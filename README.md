# URL Shortener 🔗
A simple web application built with Node.js, Express, and MongoDB for you to readily get a shortened URL to use.

The URL shortener must be implemented at the backend together with a validator, which must be able to indicate if the generated link is actually working. The communication between backend and frontend must be handled by a RESTful API, where the results will be shown.

It's expected that on top of shortening a URL, we are also able to keep an access count, so each time the URL is accessed, we can track a list of these accumulated values and rank the URLs properly.

## User Stories
1. User can input a set of URL aiming to be shortened
2. User can get a warning message for invalid URL format input
3. User can get a set of shortened URL from the original URL provided
4. User can go to the shortened URL by clicking the  button
5. User can reset the input columns for next URL generation 
6. User can be redirected to the original URL by visiting the shortened URL

_

## Installation
The following instructions will get you a copy of the project and all the setting needed to run it on your local machine.


### Prerequisites

- [npm](https://www.npmjs.com/get-npm)
- [Node.js v10.16.0](https://nodejs.org/en/download/)
- [MongoDB v4.0.10](https://www.mongodb.com/download-center/community)


### Clone

Clone this repository to your local machine


$ git clone [https://github.com/Abhinav1213/shortener_frontend.git]
$ git  clone [https://github.com/Abhinav1213/Shortener_backend.git]


### Setup

*1. Enter the project folder*

*2. Install npm packages*

$ npm install


*3. Activate the server*


$ npm start


*4. Find the message for successful activation*


> App is running
> mongoose connected!

You may visit the application on browser with the URL: http://localhost:8000

_
