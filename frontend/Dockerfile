# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-slim as build-stage

RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y
RUN npm install -g pnpm

WORKDIR /app
COPY ./nginx.conf /nginx.conf
COPY package*.json /app/


# set default node env
ARG NODE_ENV=development
# ARG NODE_ENV=production # to be able to run tests (for example in CI), do not set production as environment
ENV NODE_ENV=${NODE_ENV}

ENV VITE_BACKEND_IP=127.0.0.1
ENV VITE_BACKEND_PORT=8080
ENV VITE_AUTH_IP=127.0.0.1
ENV VITE_AUTH_PORT=3000

RUN pnpm install

COPY ./ /app/
RUN pnpm build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# Note it leaves out almost everything from build stage, making a MUCH smaller final container
FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf




