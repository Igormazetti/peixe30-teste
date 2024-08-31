FROM node:20-alpine

WORKDIR /home/node

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

RUN npm run build

RUN npx prisma migrate deploy

RUN npm run seed

EXPOSE 6060
