FROM node:20-alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY ./ .
COPY .env.docker ./.env

RUN npm run build
ENV NODE_ENV=production

RUN ["npm", "run", "migrate:dev"]
CMD ["npm", "run" ,"start"]
