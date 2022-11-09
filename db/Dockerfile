FROM mysql

WORKDIR /db

COPY . .

COPY ./db.sql /docker-entrypoint-initdb.d/
