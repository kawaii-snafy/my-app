FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 4000

RUN chown -R node /usr/src/app
USER node

RUN npm run build

CMD ["nodemon", "build/index.js", "localhost", "4000"]
