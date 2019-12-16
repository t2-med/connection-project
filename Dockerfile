FROM node:latest

WORKDIR /usr/src/app

RUN apt update && apt install -y netcat 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]