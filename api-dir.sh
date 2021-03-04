#!/bin/sh
export ARCHING_KAOS_API_DIR=$PWD/storage/.arching-kaos-api
mkdir -p $ARCHING_KAOS_API_DIR
cp ipList.json-sample $ARCHING_KAOS_API_DIR/ipList.json
cp shows.json-sample $ARCHING_KAOS_API_DIR/shows.json
