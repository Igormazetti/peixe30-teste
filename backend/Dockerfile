FROM node:20-alpine

WORKDIR /home/node

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run prisma-setup

RUN npm run seed

EXPOSE 6060

CMD ["npm", "start"]
