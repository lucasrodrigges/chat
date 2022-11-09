FROM node:16-alpine3.15

WORKDIR /backend

EXPOSE 3001

ADD package.json .

COPY . .

RUN npm i

CMD ["npm", "start"]