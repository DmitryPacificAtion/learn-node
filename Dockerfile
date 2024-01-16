# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /app

RUN npm install
RUN npm install -g nodemon

# Copy the rest of the source files into the image.
COPY package*.json ./

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application in dev mode to use with Compose watch feature
CMD npm run start
