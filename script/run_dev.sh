#!/bin/sh

cd ~/the-parabole-fe

git pull -f origin dev

cd submodule
git fetch 
git merge origin main

cp .env ../.env

npm install

npm install -g pm2

pm2 reload all
