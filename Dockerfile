FROM node:12-stretch as install
WORKDIR /usr/src/app
COPY package* ./
COPY src/ src/
RUN yarn install

FROM node:12-stretch as test
WORKDIR /usr/src/app
COPY --from=install /usr/src/app .
ARG MAIl_HOST mail_nog
ARG MAIl_PORT 1025
EXPOSE 3000
RUN [ "yarn", "test" ]

FROM node:12-stretch as start
WORKDIR /usr/src/app
COPY --from=install /usr/src/app .
ARG MAIl_HOST
ARG MAIl_PORT
EXPOSE 3000
CMD [ "yarn", "start" ]
