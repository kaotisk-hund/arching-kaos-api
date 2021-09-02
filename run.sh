#!/bin/sh
podman run --pod arching-kaos --name api -d --restart=always -v $PWD/storage/.arching-kaos-api:/root/.arching-kaos-api -v $PWD/etc/ssb-pub-data:/root/.ssb docker.io/kaotisk/arching-kaos-api
