#!/bin/sh
export ARCHING_KAOS_API_DIR=$PWD/storage/.arching-kaos-api
mkdir -p $ARCHING_KAOS_API_DIR
cd $ARCHING_KAOS_API_DIR
echo "[{"ip":"127.0.0.1"}]" > ipList.json
echo "[{}]" > shows.json
