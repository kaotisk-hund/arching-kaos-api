#!/bin/sh
docker run --name api -d --restart=always -p 3001:3001 -v $PWD/storage/.arching-kaos-api:/root/.arching-kaos-api -v $PWD/etc/ssb-pub-data:/root/.ssb --network=host api
