FROM node:16

WORKDIR /app

COPY ./ /app
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]