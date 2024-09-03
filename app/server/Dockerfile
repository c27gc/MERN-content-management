FROM node:18-slim

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install -g ts-node-dev

RUN npm install -D -g nodemon

RUN npm install --production=false

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
