FROM node:12-alpine as install_dev
WORKDIR /app
COPY . .
RUN yarn install

FROM node:12-alpine as install_prod
WORKDIR /app
COPY package.json .
RUN yarn install --production

FROM node:12-buster as test
WORKDIR /app
COPY --from=install_dev /app .
COPY scripts/build/entry_test_image.sh .
ARG MAIl_HOST
ARG SMTP_PORT
ARG CODECOV_TOKEN
EXPOSE 3000
CMD ["./entry_test_image.sh"]

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