#!/bin/sh

PROJECT_NAME="The Parabole"

TODAY=$(date +"%Y%m%d")

DEPLOY_PATH=/home/ubuntu

LOG_PATH=$DEPLOY_PATH/log
LINK_LOG_FILE=$LOG_PATH/parabole.log
LOG_FILE=$LOG_PATH/$PROJECT_NAME_$TODAY.log
ERR_LOG_FILE=$LOG_PATH/$PROJECT_NAME_ERROR_$TODAY.log

echo "> Start run.sh for $PROJECT_NAME : $TODAY" >> $LOG_FILE

echo "> Delete log link file" >> $LOG_FILE

rm $LINK_LOG_FILE
ln -s $LOG_FILE $LINK_LOG_FILE
echo "> Build log : $LOG_FILE" >> $LOG_FILE

cd ~/the-parabole-fe

echo "> git pull start" >> $LOG_FILE

git pull -f origin dev

cd submodule
git fetch 
git merge origin main

echo "> Copy .env file" >> $LOG_FILE

cp .env ../.env

echo "> npm install start" >> $LOG_FILE

npm install
npm install -g pm2

echo "> Deploy start "
pm2 reload all

echo "> End of run.sh" >> $LOG_FILE
