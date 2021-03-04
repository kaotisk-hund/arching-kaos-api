#!/bin/sh
docker build -t api .
docker run --name api -d --restart=always -p 3001:3001 -v {$HOME}/.arching-kaos-api:/root/.arching-kaos-api -v {$HOME}/ssb-pub-data:/root/.ssb --network=host api
