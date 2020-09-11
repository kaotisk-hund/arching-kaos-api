!/bin/bash
while true; do
cd $HOME/arching-kaos-api && node api.js >> log.txt 2>&1
sleep 30
done
