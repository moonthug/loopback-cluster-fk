#!/usr/bin/env bash

BASE_PORT=3000;
INSTANCE_COUNT=5;

trap ctrl_c INT

function ctrl_c() {
  echo "Cleaning up..."
  forever stopall
  exit 0
}

for (( i = BASE_PORT; i <= $BASE_PORT + $INSTANCE_COUNT - 1; i++))
  do
    export PORT="$i"
#    export DEBUG="*discovery-agent*"
    forever start .
  done

while(true)
do
  ALIVE_COUNT=$(/usr/local/Cellar/etcd/3.2.15/bin/etcdctl ls /service/es-twitter | wc -l)
  clear
  echo "Running $ALIVE_COUNT services..."
  sleep 5;
done
