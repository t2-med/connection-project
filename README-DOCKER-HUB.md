# RUN IMAGE

>## node_connection is an API Rest, based in node js and mongoDB, which allows users to
>
>* register
>* log-in
>* log-out
>* recover forgotten password
>* oauth -> log-in with google account

## OPTION 1 (docker run)

node_connection image depends on mongoDB so it must be linked to this

```bash
docker network create net_connection

docker run --name mongo_connection --network net_connection -p 27017:27017 -v $PWD/data/mongodb:/data/db -d mongo

docker run --name node_connection --network net_connection -p 3000:3000 -d med2bouanane/node_connection

```

## OPTION 2 (use docker-compose)

copy the docker-compose.yml and .env and .env.local files:

## docker-compose.yml

```bash
version: "3"
services:
  node_connection:
    container_name: node_connection
    image: '${DOCKER_USER}/node_connection'
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    depends_on:
      - mongo_connection
    command: ./wait-for.sh ${MONGO_CONTAINER}:${DB_PORT} -- npm start
    ports:
      - "${NODE_PORT}:${NODE_PORT}"
    networks:
      - net_node
    env_file:
      - .env.${NODE_ENV}
  mongo_connection:
    container_name: ${MONGO_CONTAINER}
    image: mongo
    restart: unless-stopped
    ports:
      - "${DB_PORT}:27017"
    networks:
      - net_node
    volumes:
     - ${MONGO_VOLUME}:/data/db

networks:
  net_node:
```

## .env

```bash
NODE_ENV=dev

# Server
NODE_PORT=3000

# DATA BASE MONGODB
DB=mongodb
DB_PROTOCOL=mongodb://
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=t_connection

# AUTH
SECRET_TOKEN='mySecterToken'

#DOCKER
DOCKER_USER=med2bouanane
MONGO_CONTAINER=mongo_connection
MONGO_SERVICE=mongo_connection
MONGO_VOLUME=./data/mongodb
MINOR_TAG=0
```

## Execute Image

```bash
docker-compose pull --include-deps node_connection
docker-compose up -d
```

## Accessing API Rest

<http://localhost:3000/api-docs/>
