# Use the official Node.js 18 Alpine image as a base image
FROM node:18-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json .
COPY yarn*.lock .


COPY . .

RUN yarn install


EXPOSE 7001

CMD ["yarn", "dev2"]

