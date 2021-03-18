# stage: 1
# FROM ubuntu:latest
# USER root
# WORKDIR /home/app
# COPY . /home/app
# ENV PATH /home/app/node_modules/.bin:$PATH
# RUN apt-get update
# RUN apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
# RUN apt-get -y install nodejs
# RUN npm install -g nodemon
# RUN npm install  
# CMD ["npm", "run","start"]


FROM node:lts-alpine as web-build
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon
CMD ["npm", "run","start"]