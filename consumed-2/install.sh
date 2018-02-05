#!/usr/bin/env bash

MODULES_PATH="../modules"

if [ -d "$MODULES_PATH" ];
  then
    npm link "$MODULES_PATH/loopback-connector-disco-rest"
  else
    npm install git+https://git@github.com/moonthug/loopback-connector-disco-rest.git#feature/discovery-agent --save
fi
