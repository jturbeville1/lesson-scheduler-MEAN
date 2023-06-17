FROM node:18 as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist/lesson-scheduler-client /usr/share/nginx/html

EXPOSE 80