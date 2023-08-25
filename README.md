# Quiz
A simple quiz application designed to educate students about English grammar and language usage. Users are prompted to determine if sentences exhibit correct grammar and logical coherence. Users are then presented with their results at the end of their activity
Support implemented for round and non-based activities.

## Technologies Used
* React
* NodeJS
* TypeScript

## Setup

Dependencies include:
React,
Typescript,
Nodejs,
Material UI

### Steps
Set up the virtual machine.
```
sudo apt-get update
sudo yum install nodejs npm
```

Installation of the Quiz.
```
git clone https://github.com/PeterFCKeen/Quiz.git
cd Quiz

npm install
```

If you get the 'ERR_OSSL_EVP_UNSUPPORTED' error.
```
export NODE_OPTIONS=--openssl-legacy-provider
```

Specify url of machine running the proxy machine
```
vim .env

REACT_APP_PROXY_URL=*url*
```

### Run in Dev

Run the Quiz in dev mode.
```
npm start
```

Open another terminal to run the proxy server.
```
cd Quiz/
node server.js
```


### Run in Prod

Run the proxy server as a forever script.
```
sudo npm install -g forever
forever start server.js
```

Build the quiz.
```
npm run build
```

Set up Nginx to serve the quiz.
```
sudo yum install nginx

```

Append the location rule to your Nginx configuration. Next the location code inside of your existing server config.
```
sudo vim /etc/nginx/nginx.conf

server {
    ...
    location / {
        root /path/to/your/react/application/build;
        index index.html;
        try_files $uri /index.html;
    }
    ...
}
```

Start the service
```
sudo service nginx start</li>
```

## Improvements
### Proxy Server
The Proxy server has a knock on affect for the infrastructure of this project. As we need to have another process running to facilitate the proxy. This complicated the release infrastructure.

Ideally this project would be running in Docker containers. However we'd need two containers. One for the running of the application and one for the CORS proxy server.

One ideal solution could be to lambda-ise the proxy server and docker the app. Deploy the app to S3 and redirect the url to the lambda function.

### Test coverage
Implement further tests to improve the coverage of the application. Tests were sidelined given time taken to learn react for this project. Next ticket would be to target tests so we can improve our confidence in the code.
