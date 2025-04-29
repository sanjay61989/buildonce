# STEP 1: Build Angular app
FROM node:22-slim AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build 

# STEP 2: Serve via Nginx with runtime env injection
FROM nginx:alpine
COPY --from=builder /app/dist/buildonce/browser /usr/share/nginx/html

# Copy the env template and runtime injector
COPY src/assets/env.template.json /usr/share/nginx/html/assets/env.template.json

# Copy the runtime environment script
COPY runtime-env.sh /docker-entrypoint.d/90-runtime-env.sh

# Set permissions for the runtime script
RUN chmod +x /docker-entrypoint.d/90-runtime-env.sh

# Ensure the env.json is generated correctly
RUN cat /usr/share/nginx/html/assets/env.json
