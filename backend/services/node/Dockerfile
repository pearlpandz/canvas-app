# Use the official Node.js image
FROM node:slim

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the app
CMD ["node", "server.js"]
