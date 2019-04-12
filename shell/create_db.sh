#!/bin/sh

docker container create --name db_mongo -p 27018:27017 mongo