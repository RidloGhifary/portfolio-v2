# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .
run npm run build 

# Production Stage
FROM node:18-alpine AS production
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]