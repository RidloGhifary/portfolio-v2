# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .
RUN npm run build 

# Production Stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy built files from the build stage
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]