FROM node:latest

WORKDIR '/riung-api'

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]