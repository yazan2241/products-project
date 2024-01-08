FROM node:16.14.2

WORKDIR /var/www/html/client

COPY public/ /var/www/html/client/public
COPY src/ /var/www/html/client/src
COPY package.json /var/www/html/client/

RUN npm install

CMD ["npm", "start"]