FROM node:alpine

RUN mkdir -p /usr/src/topic-board/api

WORKDIR /usr/src/topic-board/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]