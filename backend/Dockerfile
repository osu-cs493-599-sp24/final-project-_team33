FROM node:20-alpine
WORKDIR /usr/src/app
COPY ./backend ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]