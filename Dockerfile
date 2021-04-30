
FROM ubuntu:20.04

RUN mkdir -p /src
WORKDIR /src
COPY . /src

RUN apt-get update -y
RUN apt-get -y install curl gnupg postgresql-client
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs

RUN npm --version
RUN npm install -g yarn
RUN npm install -g pm2
RUN yarn

RUN chmod +x ./wait-for-postgres.sh