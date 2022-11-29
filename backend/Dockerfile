FROM node:18.12.1

EXPOSE 3001

ADD package.json .

COPY . .

RUN npm i

# CMD npx sequelize db:create && npx sequelize db:migrate