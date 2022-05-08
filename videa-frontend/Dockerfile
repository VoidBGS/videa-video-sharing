FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install --quiet
COPY ./ /app/
RUN npm run build
 
FROM nginx:1.21
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf