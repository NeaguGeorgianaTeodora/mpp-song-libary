FROM node:lts-alpine3.18

ENV HOMEDIR=/server

WORKDIR $HOMEDIR

RUN npm install -g pm2 yargs

# JavaScript dependencies
COPY package*.json $HOMEDIR

RUN rm -rf node_modules && npm install --force
RUN npm rebuild bcrypt

COPY . $HOMEDIR

EXPOSE 80

CMD [ "npm", "run", "start"]
