#!/bin/bash

docker rm -f web
docker run \
    -v $PWD/../src/web:/wrd \
    -p 5044:5000 \
    --name web \
    -w /wrd \
    -ti python:3.6 bash -c "pip3 install -r requirements.txt && python3 app.py"
