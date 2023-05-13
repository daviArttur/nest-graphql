FROM node:18-alpine

COPY . /usr/src/app/nestjs-graphql

WORKDIR /usr/src/app/nestjs-graphql

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE 3002