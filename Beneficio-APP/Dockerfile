## Global
ARG BASE_HREF=/
### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
ARG CONF=production
ARG BASE_HREF
COPY package.json package-lock.json ./
RUN npm install --verbose
COPY . .
RUN npm run -- ng build --configuration=$CONF --prod --build-optimizer --base-href ${BASE_HREF} --output-path=./dist${BASE_HREF}

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
ARG BASE_HREF
ENV APP_BASE_HREF=${BASE_HREF}
RUN echo $APP_BASE_HREF
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s|#APP_BASE_HREF#|$APP_BASE_HREF|g" /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf
