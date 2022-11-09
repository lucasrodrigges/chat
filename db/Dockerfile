FROM mysql

WORKDIR /db

EXPOSE 3306

COPY . .

COPY ./db.sql /docker-entrypoint-initdb.d/
