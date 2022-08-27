FROM node:16-alpine
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ .
EXPOSE 5000
CMD ["npm", "run", "dev"]