<h1>starter nodejs Application</h1>
google-site-verification: google3e38bf3966111dda.html
<h2>Built using modern technologies: node.js, express, mongoDB, mongoose,redis </h2>
<h3>deploy: npm start</h3>
<h3>deploy with docker on the ubuntu server : </h3>
<p>1-<code>sudo apt install docker.io</code></p>
<p>2- <code>sudo apt install docker-compose</code></p>
* in the directory of your project
<p>3-<code> docker-compose up</code></p>
* show on http://urlserver.com:5000

## tips :
1-for start this project in your server with docker pre required to change in the config.env from DATABASE_LOCAL=mongodb://localhost:27017/nodejs_starter to DATABASE_LOCAL=mongodb://mongo:27017/nodejs_starter

2-if you want use redis in your project ,you need to install the redis in your server vs machin and uncomment the line of 3 in the file of server.js 

3-if you deploy this project with docker automatically install mongodb and redis otherwise you need to install  mongodb and redis individually


