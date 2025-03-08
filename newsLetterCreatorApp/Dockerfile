# Stage 1: Build the Angular app
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install Angular dependencies
RUN npm install

# Copy the entire app
COPY . .

# Build the Angular project
RUN npm run build

# Use a lightweight web server (nginx) to serve the static files
FROM nginx:1.25

WORKDIR /usr/share/nginx/html

# Remove default Nginx static content
RUN rm -rf ./*

# Copy built Angular files from the build stage
COPY --from=build /app/dist/news-letter-creator-app/browser /usr/share/nginx/html

# Copy the built Angular app to nginx's default directory
# COPY --from=build /app/dist/news-letter-creator-app /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
