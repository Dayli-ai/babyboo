FROM node:lts-alpine3.13

ENV NODE_ENV=production

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]