# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev"]