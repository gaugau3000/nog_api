FROM node:12-stretch
COPY . /app
WORKDIR /app
EXPOSE 3000
RUN yarn install && yarn test
CMD [ "yarn", "start" ]