FROM node:lts-alpine3.18

ENV HOMEDIR=/client

WORKDIR $HOMEDIR

# JavaScript dependencies
COPY package*.json $HOMEDIR

RUN rm -rf node_modules && npm install --force

COPY . $HOMEDIR

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
