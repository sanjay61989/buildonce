# STEP 1: Build Angular app
FROM node:22-slim AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# STEP 2: Serve via Nginx with runtime env injection
FROM nginx:alpine

# Install Node.js in the Nginx image for runtime environment injection
RUN apk add --no-cache nodejs npm

# Copy Angular app's built files into Nginx directory
COPY --from=builder /app/dist/buildonce/browser /usr/share/nginx/html

# Copy the env template and Node.js runtime injector
COPY src/assets/env.template.json /usr/share/nginx/html/assets/env.template.json
COPY runtime-env.js /usr/share/nginx/html/runtime-env.js

# Generate env.json using Node.js script at build time (just for the build)
RUN node /usr/share/nginx/html/runtime-env.js

# Expose port 80 and start Nginx
EXPOSE 80

# Set entrypoint to run the Node.js script and Nginx at container runtime
ENTRYPOINT ["sh", "-c", "node /usr/share/nginx/html/runtime-env.js && exec nginx -g 'daemon off;'"]
