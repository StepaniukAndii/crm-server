
FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN npm install
RUN npm install webpack
RUN chmod 777 /user/src/app/node_modules
RUN mkdir dist
RUN chmod 777 /user/src/app/dist
USER node

RUN npm run build

CMD ["npm", "run", "start:dev"]