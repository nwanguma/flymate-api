FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm install -g typescript ts-node

COPY . .

RUN apk add --no-cache redis

EXPOSE 6379

EXPOSE 8000

CMD ["npm", "run", "start:dev"]
