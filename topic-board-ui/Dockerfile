FROM node:alpine

RUN mkdir -p /usr/src/topic-board/ui

WORKDIR /usr/src/topic-board/ui

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]