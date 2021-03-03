#!/bin/sh
docker run --name api -d --restart=always -p 3001:3001 -v /home/kaotisk/.arching-kaos-api:/root/.arching-kaos-api -v /home/kaotisk/ssb-pub-data:/root/.ssb --network=host api
