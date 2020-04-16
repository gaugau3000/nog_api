FROM node:12-stretch as install
WORKDIR /app
COPY . .
RUN yarn install

FROM node:12-stretch as test
WORKDIR /app
COPY --from=install /app .
ENV MAIl_HOST mail_nog
ENV MAIl_PORT 1025
EXPOSE 3000
RUN [ "yarn", "test"]

FROM node:12-stretch as start
WORKDIR /app
COPY --from=install /app .
ARG MAIl_HOST
ARG MAIl_PORT
EXPOSE 3000
CMD [ "yarn", "start"]