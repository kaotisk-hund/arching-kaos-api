#!/bin/sh
sed -i.bak -e 's/{$HOME}/\/home\/kaotisk/' install.sh
sed -i.bak -e 's/{$HOME}/\/home\/kaotisk/' install.sh

sh ./api-dirs.sh
