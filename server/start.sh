#!/bin/sh
docker compose -f docker/compose.yaml up --detach

npx ts-node app.ts

