# Use official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Node.js app will run on
EXPOSE 3000

# Command to run your app
CMD ["node", "server.js"]
