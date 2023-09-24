FROM node:lts-slim
ENV NODE_ENV development
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
USER root
COPY . .
RUN npm install -g concurrently nodemon && npm install
RUN npm install -g typescript
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "devstart"]