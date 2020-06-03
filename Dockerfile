FROM node:12-alpine as install_dev
WORKDIR /app
COPY . .
RUN yarn install

FROM node:12-alpine as install_prod
WORKDIR /app
COPY package.json .
RUN yarn install --production

FROM install_dev as test
WORKDIR /app
COPY --from=install_dev /app .
ARG MAIl_HOST
ARG SMTP_PORT
EXPOSE 3000
CMD [ "yarn test && bash <(curl -s https://codecov.io/bash)"]

FROM install_dev as build
WORKDIR /app
COPY --from=install_dev /app .
RUN [ "yarn", "build"]

FROM node:12-alpine as start
WORKDIR /app
COPY --from=install_prod /app .
COPY --from=build /app/dist/ dist/
ARG MAIl_HOST
ARG SMTP_PORT
EXPOSE 3000
CMD [ "yarn", "start"]