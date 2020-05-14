# proxy-server

A simple proxy-server for adding Cors middleware on your GET requests and all the requests are cached using Redis. So, when you make a request to an endpoint and if you make the second request to the same endpoint it will save your time and network request by giving you the results from the cached store instead of the server.

How to use: -<br /> ```https://nitingupta220-proxy-server.herokuapp.com/cors?url=https://jsonplaceholder.typicode.com/albums/```
<br />
<br />
Just replace the url after the ```/cors?url=```

