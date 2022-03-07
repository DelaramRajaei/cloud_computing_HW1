FROM node:lts-alpine
WORKDIR backend
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn","start"]