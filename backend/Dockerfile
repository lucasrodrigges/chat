FROM node:18-alpine3.15

WORKDIR /backend

EXPOSE 3001

ADD package.json .

COPY ./src ./src

RUN npm install

CMD npm start