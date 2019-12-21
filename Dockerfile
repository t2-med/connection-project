FROM node:latest

WORKDIR /usr/src/app

# used by wait-for.sh
RUN apt update && apt install -y netcat 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]