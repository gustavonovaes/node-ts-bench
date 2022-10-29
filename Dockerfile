FROM node:18-alpine as builder
WORKDIR /build 

COPY package.json package-lock.json ./
RUN npm install --omit=optional

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./webpack.config.js ./webpack.config.js
RUN npm run build


## 168MB
FROM node:18-alpine as release 
## 51MB
# FROM alpine:latest as release
# RUN apk add --no-cache nodejs
WORKDIR /app

COPY --from=builder /build/dist ./dist

ENV NODE_ENV production
ENV PORT 4000

EXPOSE 4000
CMD [ "node", "dist/index.js"]

