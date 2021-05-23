#!/bin/bash
  
docker rm -f frontend 

docker run \
    -v $PWD/../src/frontend:/wrd \
    -w /wrd \
    -p 5043:5000 \
    --name frontend \
    node:12.18.2-slim \
    yarn start

