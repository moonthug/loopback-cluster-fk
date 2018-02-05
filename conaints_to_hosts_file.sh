#!/usr/bin/env bash

if ! [ -x "$(command -v ghost)" ]; then
  echo 'Error: ghost is not installed.' >&2
  exit 1
fi

ghost empty

for SERVICE in `docker ps -q`; do
  echo "Add Service: $SERVICE"
  SERVICE_IP_ADDRESS=`docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $SERVICE`
  ghost add $SERVICE 127.0.0.1
done

cat /etc/hosts