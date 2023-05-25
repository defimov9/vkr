# Stage 1: Build React app
FROM node:14 AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve React app with a lightweight web server
FROM node:14 AS frontend-serve
WORKDIR /app
COPY --from=frontend-build /app/build ./build
RUN npm install -g serve
CMD serve -s build -l 3000

EXPOSE 3000