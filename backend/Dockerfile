# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the backend code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
