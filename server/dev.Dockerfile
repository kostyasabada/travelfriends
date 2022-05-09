FROM node:16.13.1-alpine3.13
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

