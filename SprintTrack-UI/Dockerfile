FROM node:22 AS build

WORKDIR /app

COPY package* ./

COPY . .

COPY nginx.c* ./

RUN ls -ltr /app

RUN rm -rf dist*

RUN rm -rf node_mod*

RUN npm install --force

RUN npm install -g @angular/cli@19

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

