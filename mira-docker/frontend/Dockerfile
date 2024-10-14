FROM node:18.17.1
WORKDIR /app

COPY app/frontend/package.json ./

COPY app/frontend .

RUN npm install

RUN set -eu && yarn

CMD ["yarn", "dev"]
