FROM node:16.13.1-alpine3.13
WORKDIR /app
COPY /package*.json /app/
RUN npm install
COPY . /app
