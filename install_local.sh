#!/usr/bin/env bash

#export SERVICE_DISCOVERY_ADAPTER=consul
#export SERVICE_DISCOVERY_HOST=consul-master
#export SERVICE_DISCOVERY_PORT=8500
#export DEBUG=*connector:rest*,*service-discovery*,*discovery-agent*;
      
# Global
brew install etcd
brew services restart etcd
npm install -g forever

# Enterprise
cd ./enterprise-service/
npm install
cd ..

# Channel
cd ./channel-service/
npm install
cd ..