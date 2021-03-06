#!/bin/sh
sed -i.bak -e 's/{$IPFS_SERVER_NAME}/ipfs.arching-kaos.local/' config.js
sed -i.bak -e 's/{$HOME}/\/home\/kaotisk/g' install.sh
sed -i.bak -e 's/{$HOME}/\/home\/kaotisk/' install.sh

sh ./api-dirs.sh
