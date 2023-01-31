FROM mhart/alpine-node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "server.js" ]
