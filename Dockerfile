FROM --platform=linux/arm64 node:20-alpine

WORKDIR /usr/src/app
COPY package.json ./
# COPY yarn.lock ./
RUN apk update && apk add git
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

RUN yarn
COPY . ./
RUN yarn build

EXPOSE 5000
CMD ["yarn", "start:prod"]

