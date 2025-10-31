# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose your app's port
EXPOSE 5050

# Start the server
CMD ["node", "server.js"]
