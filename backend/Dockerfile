FROM node:14 AS backend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]

EXPOSE 3001