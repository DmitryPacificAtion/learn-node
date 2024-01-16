# syntax=docker/dockerfile:1

# Taking node latest image
FROM node:alpine

# This would be a working folder inside the image
WORKDIR /usr/app

# Copy the rest of the source files into the image.
COPY ./ /usr/app
COPY package*.json /usr/app

# Install npm packages inside the image
RUN npm install

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application script
CMD npm run start
