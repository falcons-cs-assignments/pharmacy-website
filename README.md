# pharmacy-website

#### node version: ```v18.6.0```
#### npm version: ```9.5.1```

___

## Prepare environment:

### clone repo
```
git clone https://github.com/falcons-cs-assignments/pharmacy-website.git
```

### server .env sample
```
DB_URI = "mongodb://127.0.0.1:27017/pharmacy"
PORT = 5000
JWT_SECRET_KEY = "MySecretKey"
JWT_ACCESS_TOKEN_EXPIRES = 30m
```

### client .env sample
```
API_URL = "http://localhost:5000"
```

___

## Installing dependencies:
go to client and server dirs and execute the same next command
```
npm install
```

___

## Running:

### server
```
npm run dev
```

### client
```
npm start
```
