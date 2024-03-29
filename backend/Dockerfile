FROM node:lts-slim as builder

# update packages, to reduce risk of vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y
RUN npm install -g pnpm

# set a non privileged user to use when running this image
RUN groupadd -r nodejs && useradd -g nodejs -s /bin/bash -d /home/nodejs -m nodejs
# Become that user
USER nodejs
# set secure folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

# set default node env
ARG NODE_ENV=development
# ARG NODE_ENV=production # to be able to run tests (for example in CI), do not set production as environment
ENV NODE_ENV=${NODE_ENV}

ENV NPM_CONFIG_LOGLEVEL=info
ENV VITE_IP_ADDR=0.0.0.0
ENV VITE_PORT=8080
ENV VITE_LOGS_DIR=logs/
ENV VITE_DB_HOST=127.0.0.1
ENV VITE_DB_PORT=5432
ENV VITE_DB_USER=experience
ENV VITE_DB_PASS=experience
ENV VITE_DB_NAME=experience

# copy project definition/dependencies files, for better reuse of layers
COPY --chown=nodejs:nodejs package*.json ./

# install dependencies here, for better reuse of layers
RUN pnpm install

# copy all sources in the container (exclusions in .dockerignore file)
COPY --chown=nodejs:nodejs . .

# build/pack binaries from sources
RUN pnpm build

# exposed port
EXPOSE 8080

CMD [ "node", "./build/index.js" ]
