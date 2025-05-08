# Step 1: Build the React app
FROM node:slim AS builder
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ 
RUN npm config set strict-ssl false
RUN npm ci --verbose

# Copy the rest of the application files
COPY . .
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
