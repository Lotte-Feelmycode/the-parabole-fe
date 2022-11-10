#!/bin/sh
# git submodule 포함 버전으로 clone

ssh ec2-user@3.39.167.221 <<EOF	

		// 파일 이동
    cd ~/the-parabole-fe
 
		// 최신버전으로 풀 받기(버전발행 후는 main)
    git pull -f origin dev

		// 서브모듈 디렉토리로 이동해서 풀 받기
		cd submodule
		git fetch 
		git merge origin main

		// .env 파일 갖고 나오기
		cp .env ../.env

		// npm 패키지 설치
    npm install

		// p2 설정...?
    npm install -g pm2

		// 실행시키기(pm2 사용하나요?)
    pm2 restart ecosystem.config.js
    exit
EOF
