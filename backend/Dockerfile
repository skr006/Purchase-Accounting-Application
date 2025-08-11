# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.15.0
FROM node:${NODE_VERSION}-alpine

# Set environment
ENV NODE_ENV production

WORKDIR /usr/src/app

# Install dependencies (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy .env into image
COPY .env .env

# Copy rest of the app
COPY . .

# Expose API port
EXPOSE 5001

# Run app
CMD ["node", "src/server.js"]
