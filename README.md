# CloudView
## Running the Node.js server
- Install [node](http://lmgtfy.com/?q=install+node.js) and [express](http://lmgtfy.com/?q=install+express)
- Run ``node server.js``
- Visit ``http://localhost:8081/``

# Node Dependencies
```
$ npm install express
$ npm install mongoose
```

# Running mongodb
If you haven't already, first install mongodb
```
$ brew install mongodb
```
Then you need to create the db directory
```
$ sudo mkdir -p /data/db
$ sudo chown `whoami` /data/db
```
Now run mongodb
```
$ mongod
```