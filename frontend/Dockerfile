# frontend/Dockerfile

FROM node:18-alpine AS builder

WORKDIR /app

# 1. Install dependencies
COPY package*.json ./
RUN npm install

# 2. Copy source & build
COPY . .
RUN npm run build

# 3. Production stage
FROM node:18-alpine
WORKDIR /app

# Copy from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 4173

# Silly me
# The default "adapter-node" build can be run with "npm run preview" or "node build".
# Typically, "npm run preview" will serve the build on port 4173.
CMD ["npm", "run", "preview"]
