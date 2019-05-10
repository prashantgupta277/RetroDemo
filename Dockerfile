FROM node:carbon

WORKDIR /usr/src/app

CMD [ "npm", "run", "start" ]

COPY package.json /usr/src/app/
COPY . /usr/src/app

RUN npm install
RUN npm run build
