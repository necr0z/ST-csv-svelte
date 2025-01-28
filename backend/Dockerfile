# backend/Dockerfile
########################
# 1) Build stage
########################
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json / lock files first
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

# Build TypeScript
RUN npm run build # or npx tsc, depending on your "build" script

########################
# 2) Run stage
########################
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose port 3000
EXPOSE 3000

CMD ["node", "dist/server.js"]
