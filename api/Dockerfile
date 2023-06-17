FROM node:18
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev
COPY ./build ./build
COPY .env .
EXPOSE 8080
CMD [ "npm", "start" ]