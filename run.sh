#!/bin/bash
docker network create net_connection
docker build -t node_connection .
docker run --rm --name mongo_connection --network net_connection -p 27017:27017 -v /data/mongodb:/data/db -d mongo
docker run --rm --name node_connection --network net_connection -p 3000:3000 -d node_connection