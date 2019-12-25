FROM node:latest

WORKDIR /usr/src/app

# used by wait-for.sh
RUN apt update && apt install -y netcat 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${NODE_PORT}
CMD [ "npm", "start"]