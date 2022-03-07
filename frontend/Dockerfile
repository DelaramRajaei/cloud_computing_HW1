FROM node:lts-alpine AS builder
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn build
FROM nginx
COPY --from=builder /build /usr/share/nginx/html