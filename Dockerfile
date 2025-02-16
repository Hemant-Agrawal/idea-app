# Use the official Node.js 18 image as the base image
FROM node:20 AS builder

ARG NEXT_PUBLIC_MONGO_URL

# Set the working directory in the container
WORKDIR /app

ADD . /app

# Build the Next.js app
RUN npm install

RUN npm run build

RUN ls -lah && pwd

# Production image
FROM node:20 AS runner

# Set the working directory
WORKDIR /app

# Copy the built Next.js app and node_modules from the builder stage
COPY --from=builder /app /app

RUN ls -lah && pwd
# Expose the Next.js default port
EXPOSE 3000

# Set environment variable to tell Next.js to run in production
ENV NODE_ENV=production

# Start the Next.js server
CMD ["npm", "run", "start"]

