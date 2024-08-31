FROM node:20-alpine

WORKDIR /home/node

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6060

CMD ["npm", "start"]
