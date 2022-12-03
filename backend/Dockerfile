FROM ubuntu:22.04

EXPOSE 3001

ADD package.json .

COPY . .

RUN bash ./script/install.sh

RUN npm i